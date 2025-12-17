import { User } from '../../users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'posts',
})
export class Post {
  @ApiProperty({description: 'Unique identifier for the post'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({description: 'Title of the post'})
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({description: 'Content of the post'})
  @Column({ type: 'text', nullable: true })
  content: string;

  @ApiProperty({description: 'URL of the cover image'})
  @Column({ type: 'varchar', length: 900, name: 'cover_image', nullable: true})
  coverImage: string;

  @ApiProperty({description: 'Summary of the post'})
  @Column({ type: 'varchar', length: 500, name: 'summary', nullable: true})
  summary: string;

  @ApiProperty({description: 'Status of the post'})
  @Column({ type: 'boolean', default: true, name: 'is_draft'})
  isDraft: boolean;

  @ApiProperty({description: 'Date and time when the post was created'})
  @CreateDateColumn({
     type: 'timestamptz',
         default: () => 'CURRENT_TIMESTAMP',
          name: 'created_at',
         })
      createdAt: Date;

      @ApiProperty({description: 'Date and time when the post was last updated'})
      @UpdateDateColumn({
         type: 'timestamptz',
         default: () => 'CURRENT_TIMESTAMP',
          name: 'updated_at',
         })
      updatedAt: Date;

     
      @ManyToOne(() => User, (user) => user.posts, { nullable: true})
      @JoinColumn({ name: 'user_id' })
      user: User;


      @ManyToMany(() => Category, (category) => category.posts)
      @JoinTable({
        name: 'post_categories',
        joinColumn: { name: 'post_id', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id'},
      })
      categories: Category[];

     }
