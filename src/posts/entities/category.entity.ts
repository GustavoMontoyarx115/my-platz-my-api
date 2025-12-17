import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, name: 'name'})
  name: string;

  @Column({ type: 'varchar', length: 800, nullable: true})
  description: string;

  @Column({ type: 'varchar', length: 800, nullable: true, name: 'cover_image'})
  coverImage: string;

  @CreateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',

  })
  createdAt: Date;

  @UpdateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}
