import { Controller, Get, Post, Body,  Param, Delete, Put, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './../services/posts.service';
import { CreatePostDto } from './../dto/create-post.dto';
import { UpdatePostDto } from './../dto/update-post.dto';
import { Playload } from 'src/auth/models/playload.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Post as PostEntity } from '../entities/post.entity';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
 @ApiOperation({summary: 'Create a new post'})
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const payLoad = req.user as Playload;
    const userId = +payLoad.sub;
    return this.postsService.create(createPostDto, userId);
  }

 @ApiOperation({summary: 'Get all posts'})
 @ApiResponse({status: 200, description: 'List of posts'})
  @Get()
  findAll() {
    return this.postsService.findAll();
  }
  @ApiOperation({summary: 'Get a post by ID'})
  @ApiResponse({status: 200, description: 'Post details', type: PostEntity})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }
  @ApiOperation({summary: 'Update a post by ID'})
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
   update( @Param('id', ParseIntPipe) id: number,@Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }
  @ApiOperation({summary: 'Publish a post by ID'})
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/publish')
  publish(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const payLoad = req.user as Playload;
    const userId = +payLoad.sub;
    return this.postsService.publish(id, userId);
  }
  @ApiOperation({summary: 'Delete a post by ID'})
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
