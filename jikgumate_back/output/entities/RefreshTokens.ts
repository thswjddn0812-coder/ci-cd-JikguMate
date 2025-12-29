import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("fk_token_user", ["userId"], {})
@Entity("Refresh_Tokens", { schema: "JikguMate" })
export class RefreshTokens {
  @PrimaryGeneratedColumn({ type: "int", name: "token_id" })
  tokenId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "token_value", length: 255 })
  tokenValue: string;

  @Column("timestamp", { name: "expires_at" })
  expiresAt: Date;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.refreshTokens, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
