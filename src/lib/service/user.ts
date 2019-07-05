import { provide, inject } from 'midway';
import {
  IUserService,
  IUserUpdates,
} from '../../interface';
import { IUserModel } from '../model/user';

@provide()
export class UserService implements IUserService {
  /* tslint:disable:variable-name */
  @inject()
  UserModel: IUserModel;

  async create(openId: string): Promise<string> {
    const model = await this.UserModel
      .scope('avaliable')
      .findByPk(openId, {
        attributes: ['id'],
      });

    if (model && model.id) {
      return model.id
    }

    const user = await this.UserModel.create({
      id: openId
    });

    return user.id;
  }

  async update(id: string, updates: IUserUpdates): Promise<boolean> {
    const updateResult = await this.UserModel
    .scope('avaliable')
    .update(
      updates,
      { where: { id } },
    );

    // affected rows should greater than 0
    return updateResult[0] > 0;
  }
}
