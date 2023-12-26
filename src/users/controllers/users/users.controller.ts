import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Res() response: Response) {
    response.send(this.userService.fetchUsers());
  }

  @Get(':id')
  getUserById(@Param('id') id: string, @Res() response: Response) {
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    response.send(user);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(
    @Body(ValidateCreateUserPipe) userData: CreateUserDto,
    @Res() response: Response,
  ) {
    this.userService.createUser(userData);
    response.send('Created');
  }

  @Get('posts')
  getUserPosts(@Res() response: Response) {
    response.send(this.userService.fetchUserPosts());
  }

  @Get('posts/comments')
  getUserPostsComments(@Res() response: Response) {
    response.send(this.userService.fetchUserPostsComments());
  }

  @Get('comments')
  getCommentById(@Query('id', ParseIntPipe) id: number) {
    const comment = this.userService.fetchCommentById(id);
    return comment;
  }
}
