class BaseService {
  constructor(repository, entityName) {
    this.repository = repository;
    this.entityName = entityName;
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    const borehole = await this.repository.findById(id);

    if (!borehole) {
      throw new NotFoundError(this.entityName);
    }

    return borehole;
  }

  async remove(id) {
    const removed = await this.repository.remove(id);
    if (!removed) {
      throw new NotFoundError(this.entityName);
    }
    return removed;
  }
}

module.exports = BaseService;
