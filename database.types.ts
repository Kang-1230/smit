export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      calender: {
        Row: {
          calender_id: string;
          plan: string | null;
          plan_date: string | null;
          study_id: string;
          user_id: string;
        };
        Insert: {
          calender_id?: string;
          plan?: string | null;
          plan_date?: string | null;
          study_id?: string;
          user_id: string;
        };
        Update: {
          calender_id?: string;
          plan?: string | null;
          plan_date?: string | null;
          study_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "calender_study_id_fkey";
            columns: ["study_id"];
            isOneToOne: false;
            referencedRelation: "study";
            referencedColumns: ["study_id"];
          },
        ];
      };
      comment: {
        Row: {
          comment_contents: string;
          comment_createtime: string;
          comment_id: string;
          comment_updatetime: string | null;
          post_id: number;
          user_id: string;
        };
        Insert: {
          comment_contents?: string;
          comment_createtime?: string;
          comment_id?: string;
          comment_updatetime?: string | null;
          post_id: number;
          user_id?: string;
        };
        Update: {
          comment_contents?: string;
          comment_createtime?: string;
          comment_id?: string;
          comment_updatetime?: string | null;
          post_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comment_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["post_id"];
          },
          {
            foreignKeyName: "comment_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      like: {
        Row: {
          created_at: string;
          id: number;
          like_post: number | null;
          like_user: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          like_post?: number | null;
          like_user?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          like_post?: number | null;
          like_user?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "like_like_post_fkey";
            columns: ["like_post"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["post_id"];
          },
          {
            foreignKeyName: "like_like_user_fkey";
            columns: ["like_user"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      post: {
        Row: {
          post_contents: string;
          post_createtime: string;
          post_id: number;
          post_name: string | null;
          post_updatetime: string | null;
          study_id: string;
          user_id: string;
        };
        Insert: {
          post_contents: string;
          post_createtime: string;
          post_id?: number;
          post_name?: string | null;
          post_updatetime?: string | null;
          study_id?: string;
          user_id?: string;
        };
        Update: {
          post_contents?: string;
          post_createtime?: string;
          post_id?: number;
          post_name?: string | null;
          post_updatetime?: string | null;
          study_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_study_id_fkey";
            columns: ["study_id"];
            isOneToOne: false;
            referencedRelation: "study";
            referencedColumns: ["study_id"];
          },
          {
            foreignKeyName: "post_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      study: {
        Row: {
          study_category: string;
          study_createtime: string;
          study_id: string;
          study_manager: string;
          study_max_people: number;
          study_name: string;
          study_period: string;
          study_score: number;
        };
        Insert: {
          study_category: string;
          study_createtime?: string;
          study_id?: string;
          study_manager?: string;
          study_max_people: number;
          study_name: string;
          study_period: string;
          study_score?: number;
        };
        Update: {
          study_category?: string;
          study_createtime?: string;
          study_id?: string;
          study_manager?: string;
          study_max_people?: number;
          study_name?: string;
          study_period?: string;
          study_score?: number;
        };
        Relationships: [
          {
            foreignKeyName: "study_study_manager_fkey";
            columns: ["study_manager"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      study_applylist: {
        Row: {
          id: string;
          is_approved: boolean;
          study_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          is_approved: boolean;
          study_id?: string;
          user_id?: string;
        };
        Update: {
          id?: string;
          is_approved?: boolean;
          study_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "study_applylist_study_id_fkey";
            columns: ["study_id"];
            isOneToOne: false;
            referencedRelation: "study";
            referencedColumns: ["study_id"];
          },
        ];
      };
      study_content: {
        Row: {
          create_time: string | null;
          study_content: string | null;
          study_content_title: string | null;
          study_id: string;
        };
        Insert: {
          create_time?: string | null;
          study_content?: string | null;
          study_content_title?: string | null;
          study_id?: string;
        };
        Update: {
          create_time?: string | null;
          study_content?: string | null;
          study_content_title?: string | null;
          study_id?: string;
        };
        Relationships: [];
      };
      study_goal: {
        Row: {
          goal_name: string | null;
          is_success: boolean | null;
          study_id: string;
          user_id: string;
        };
        Insert: {
          goal_name?: string | null;
          is_success?: boolean | null;
          study_id?: string;
          user_id: string;
        };
        Update: {
          goal_name?: string | null;
          is_success?: boolean | null;
          study_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "study_goal_study_id_fkey";
            columns: ["study_id"];
            isOneToOne: true;
            referencedRelation: "study";
            referencedColumns: ["study_id"];
          },
        ];
      };
      timer: {
        Row: {
          is_start: boolean | null;
          study_id: string;
          user_id: string;
        };
        Insert: {
          is_start?: boolean | null;
          study_id?: string;
          user_id?: string;
        };
        Update: {
          is_start?: boolean | null;
          study_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "timer_study_id_fkey";
            columns: ["study_id"];
            isOneToOne: false;
            referencedRelation: "study";
            referencedColumns: ["study_id"];
          },
        ];
      };
      user: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          name: string | null;
          profile_img: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          name?: string | null;
          profile_img?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string | null;
          profile_img?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
