import { API, Client, User, Member, Channel, Server } from "revolt.js";

export type Modal = {
    key?: string;
} & (
    | ({
          type: "mfa_flow";
      } & (
          | {
                state: "known";
                client: Client;
                callback: (ticket?: API.MFATicket) => void;
            }
          | {
                state: "unknown";
                available_methods: API.MFAMethod[];
                callback: (response?: API.MFAResponse) => void;
            }
      ))
    | { type: "mfa_recovery"; codes: string[]; client: Client }
    | {
          type: "mfa_enable_totp";
          identifier: string;
          secret: string;
          callback: (code?: string) => void;
      }
    | {
          type: "out_of_date";
          version: string;
      }
    | {
          type: "changelog";
          initial?: number;
      }
    | {
          type: "sign_out_sessions";
          client: Client;
          onDelete: () => void;
          onDeleting: () => void;
      }
    | {
          type: "show_token";
          name: string;
          token: string;
      }
    | {
          type: "error";
          error: string;
      }
    | {
          type: "clipboard";
          text: string;
      }
    | {
          type: "link_warning";
          link: string;
          callback: () => true;
      }
    | {
          type: "pending_friend_requests";
          users: User[];
      }
    | {
          type: "modify_account";
          client: Client;
          field: "username" | "email" | "password";
      }
    | {
          type: "server_identity";
          member: Member;
      }
    | {
          type: "signed_out";
      }
    | {
          type: "channel_info";
          channel: Channel;
      }
    | {
          type: "server_info";
          server: Server;
      }
    | {
          type: "image_viewer";
          embed?: API.Image;
          attachment?: API.File;
      }
    | {
          type: "user_picker";
          omit?: string[];
          callback: (users: string[]) => Promise<void>;
      }
    | {
          type: "user_profile";
          user_id: string;
          dummy?: boolean;
          dummyProfile?: API.UserProfile;
      }
    | {
          type: "create_bot";
          onCreate: (bot: API.Bot) => void;
      }
    | {
          type: "onboarding";
          callback: (
              username: string,
              loginAfterSuccess?: true,
          ) => Promise<void>;
      }
);

export type ModalProps<T extends Modal["type"]> = Modal & { type: T } & {
    onClose: () => void;
    signal?: "close" | "confirm";
};
