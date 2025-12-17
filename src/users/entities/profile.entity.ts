import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity({
    name: 'profiles',
})
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, name: 'lastname' })
    lastname: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    avatar: string;

    @CreateDateColumn({
       type: 'timestamptz',
       name: 'created_at',
       default: () => 'CURRENT_TIMESTAMP',
       })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz',
       default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
       })
    updatedAt: Date;
}






