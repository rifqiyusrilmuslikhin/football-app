class ClubsHandler {
    constructor(clubsService, validator) {
      this._clubsService = clubsService;
      this._validator = validator;
  
      this.postClubHandler = this.postClubHandler.bind(this);
      this.getClubsHandler = this.getClubsHandler.bind(this);
      this.getClubByIdHandler = this.getClubByIdHandler.bind(this);
    }
  
    async postClubHandler(request, h) {
      this._validator.validateClubPayload(request.payload);
      const { nama_klub, asal_kota } = request.payload;
  
      const clubId = await this._clubsService.addClub({ nama_klub, asal_kota });
  
      const response = h.response({
        status: 'success',
        message: 'club berhasil ditambahkan',
        data: {
          clubId,
        },
      });
      response.code(201);
      return response;
    }
  
    async getClubsHandler() {
      const clubs = await this._clubsService.getClubs();
      return {
        status: 'success',
        data: {
          clubs,
        },
      };
    }

    async getClubByIdHandler(request) {
      const { id } = request.params;
      const club = await this._clubsService.getClubById(id);
      return {
        status: 'success',
        data: {
          club,
        },
      };
    }

  }
  
  module.exports = ClubsHandler;