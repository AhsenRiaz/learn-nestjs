import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'Bob', email: 'bob@gmail.com' },
    { username: 'Superman', email: 'superman@gmail.com' },
    { username: 'Batman', email: 'batman@gmail.com' },
  ];

  private fakePosts = [
    {
      id: 1,
      title: 'computer',
      post: 'This is a computer',
    },
    {
      id: 2,
      title: 'laptop',
      post: 'This is a laptop',
    },
  ];

  private fakeComments = [
    { comment: 'This is a good product' },
    { comment: 'This is a bad product' },
  ];

  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
  }

  fetchUserById(id: string) {
    return this.fakeUsers[id];
  }

  fetchUserPosts() {
    return this.fakePosts;
  }

  fetchUserPostsComments() {
    return this.fakeComments;
  }

  fetchCommentById(id: number) {
    return this.fakeComments[id];
  }
}
