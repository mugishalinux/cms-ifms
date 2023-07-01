import { Victim } from "../../victim/entity/victim.entity";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("certificate")
export class Certificate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Victim)
  @JoinColumn()
  victim: Victim;

  @Column()
  isAllowed: boolean;
  @Column()
  status: number;
  @Column({ nullable: true })
  created_by: number;
  @Column()
  updated_by: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
