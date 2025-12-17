import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto} from '../dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post} from '../entities/post.entity';
import { OpenaiService } from 'src/ai/services/openai.service';


@Injectable()
export class PostsService {
   constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private openaiService: OpenaiService,
  ){}


  async findAll() {
  const posts = await this.postsRepository.find({
      relations: ['user.profile', 'categories'],
  });
  return posts;
  }

  async findOne(id: number) {
  const post = await this.postsRepository.findOne({
     where: { id },
     relations: ['user.profile', 'categories'],
     });
     if (!post) {
       throw new NotFoundException(`Post with ID ${id} not found`);
     }
  return post;
  }
 async create(body: CreatePostDto, userId: number) {
  try {
    const newPost = await this.postsRepository.save({
      title: body.title,
      content: body.content,
      coverImage: body.coverImage,
      summary: body.summary,
      user: { id: userId },
      categories: body.categoryIds?.map((id) => ({ id })),
    });

    return this.findOne(newPost.id);
  } catch (error) {
    console.log(error);
    throw new BadRequestException('Error creating post');
  }
}

  async update(id: number, changes: UpdatePostDto) {
    try {
      const post = await this.findOne(id);
      const updatedPost = this.postsRepository.merge(post, changes);
      const savedPost = await this.postsRepository.save(updatedPost);
      return savedPost;
    } catch {
      throw new BadRequestException('Error updating post');
      }

  }
  async remove(id: number) {
    try{
      await this.postsRepository.delete(id);
      return { message: 'error deleting post' };
    }catch{
      throw new BadRequestException('Error deleting post');
    }

  }

  async getPostsByCategoryId(categoryId: number) {
    const posts = await this.postsRepository.find({
      where: { categories: { id: categoryId } },
      relations: ['user.profile'],

    });
    return posts;
  }
  async publish(id: number, userId: number) {
    const post = await this.findOne(id);
    if (post.user.id !== userId) {
      throw new BadRequestException('You are not authorized to publish this post');
    }
    return this.postsRepository.save( { ...post,Published: true });
}

async unpublish(id: number, userId: number) {
    const post = await this.findOne(id);
    if (post.user.id !== userId) {
      throw new ForbiddenException('You are not authorized to unpublish this post');
    }
    if (!post.content || post.title || post.categories.length === 0) {
      throw new BadRequestException('post content, titele and least one category are required to unpublish a post');
    }
    const  summary = await this.openaiService.generateSummary(post.content);
    const image = await this.openaiService.generateImage(summary);
    const changes = this.postsRepository.merge(post, {
      isDraft: false,
      summary,
      coverImage: image,
    });
    const updatedPost = await this.postsRepository.save(changes);
    return this.findOne(updatedPost.id);
    }



}
