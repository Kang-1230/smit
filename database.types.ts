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
      attendance_list: {
        Row: {
          created_at: string;
          date: string | null;
          id: number;
          study_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          id?: number;
          study_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          id?: number;
          study_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "attendance_list_study_id_fkey";
            columns: ["study_id"];
            isOneToOne: false;
            referencedRelation: "study";
            referencedColumns: ["study_id"];
          },
          {
            foreignKeyName: "attendance_list_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      calendar: {
        Row: {
          calendar_id: string;
          end_time: string;
          event_date: string;
          event_description: string;
          start_time: string;
          study_id: string;
          user_id: string;
        };
        Insert: {
          calendar_id?: string;
          end_time: string;
          event_date: string;
          event_description: string;
          start_time: string;
          study_id?: string;
          user_id: string;
        };
        Update: {
          calendar_id?: string;
          end_time?: string;
          event_date?: string;
          event_description?: string;
          start_time?: string;
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
          {
            foreignKeyName: "calender_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      category_tag: {
        Row: {
          class: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          class?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          class?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      comment: {
        Row: {
          comment_contents: string;
          comment_createtime: string;
          comment_id: string;
          comment_updatetime: string;
          parent_id: string | null;
          post_id: number;
          user_id: string;
        };
        Insert: {
          comment_contents?: string;
          comment_createtime?: string;
          comment_id?: string;
          comment_updatetime?: string;
          parent_id?: string | null;
          post_id: number;
          user_id?: string;
        };
        Update: {
          comment_contents?: string;
          comment_createtime?: string;
          comment_id?: string;
          comment_updatetime?: string;
          parent_id?: string | null;
          post_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comment_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "comment";
            referencedColumns: ["comment_id"];
          },
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
      job_tag: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
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
          comment_count: number;
          like_count: number;
          post_contents: string;
          post_createtime: string;
          post_id: number;
          post_name: string | null;
          post_updatetime: string | null;
          study_id: string;
          study_startday: string | null;
          user_id: string;
        };
        Insert: {
          comment_count?: number;
          like_count?: number;
          post_contents: string;
          post_createtime?: string;
          post_id?: number;
          post_name?: string | null;
          post_updatetime?: string | null;
          study_id?: string;
          study_startday?: string | null;
          user_id?: string;
        };
        Update: {
          comment_count?: number;
          like_count?: number;
          post_contents?: string;
          post_createtime?: string;
          post_id?: number;
          post_name?: string | null;
          post_updatetime?: string | null;
          study_id?: string;
          study_startday?: string | null;
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
          study_category: string[];
          study_chaturl: string | null;
          study_createtime: string;
          study_description: string | null;
          study_id: string;
          study_imgurl: string | null;
          study_manager: string;
          study_max_people: number;
          study_name: string;
          study_period: string | null;
          study_score: number;
        };
        Insert: {
          study_category: string[];
          study_chaturl?: string | null;
          study_createtime?: string;
          study_description?: string | null;
          study_id?: string;
          study_imgurl?: string | null;
          study_manager?: string;
          study_max_people: number;
          study_name: string;
          study_period?: string | null;
          study_score?: number;
        };
        Update: {
          study_category?: string[];
          study_chaturl?: string | null;
          study_createtime?: string;
          study_description?: string | null;
          study_id?: string;
          study_imgurl?: string | null;
          study_manager?: string;
          study_max_people?: number;
          study_name?: string;
          study_period?: string | null;
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
          apply_message: string | null;
          id: string;
          is_approved: boolean | null;
          study_id: string | null;
          user_id: string | null;
        };
        Insert: {
          apply_message?: string | null;
          id?: string;
          is_approved?: boolean | null;
          study_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          apply_message?: string | null;
          id?: string;
          is_approved?: boolean | null;
          study_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "study_applylist_study_id_fkey";
            columns: ["study_id"];
            isOneToOne: false;
            referencedRelation: "study";
            referencedColumns: ["study_id"];
          },
          {
            foreignKeyName: "study_applylist_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
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
      study_personal_memo: {
        Row: {
          memo_content: string | null;
          memo_id: string;
          study_id: string;
          user_id: string;
        };
        Insert: {
          memo_content?: string | null;
          memo_id?: string;
          study_id: string;
          user_id?: string;
        };
        Update: {
          memo_content?: string | null;
          memo_id?: string;
          study_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "study_content_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "study_personal_memo_study_id_fkey";
            columns: ["study_id"];
            isOneToOne: false;
            referencedRelation: "study";
            referencedColumns: ["study_id"];
          },
          {
            foreignKeyName: "study_personal_memo_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      study_taglist: {
        Row: {
          category_id: number | null;
          id: string;
          job_id: number | null;
          study_id: string | null;
          tagtype: string;
        };
        Insert: {
          category_id?: number | null;
          id?: string;
          job_id?: number | null;
          study_id?: string | null;
          tagtype: string;
        };
        Update: {
          category_id?: number | null;
          id?: string;
          job_id?: number | null;
          study_id?: string | null;
          tagtype?: string;
        };
        Relationships: [
          {
            foreignKeyName: "study_taglist_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "category_tag";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "study_taglist_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "job_tag";
            referencedColumns: ["id"];
          },
        ];
      };
      timer: {
        Row: {
          accumulated_time: number;
          calendar_id: string | null;
          created_at: string;
          date: string | null;
          id: number;
          is_running: boolean | null;
          last_paused: string | null;
          last_start: string | null;
          study_id: string | null;
          time_rate: number;
          user_id: string | null;
        };
        Insert: {
          accumulated_time?: number;
          calendar_id?: string | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          is_running?: boolean | null;
          last_paused?: string | null;
          last_start?: string | null;
          study_id?: string | null;
          time_rate?: number;
          user_id?: string | null;
        };
        Update: {
          accumulated_time?: number;
          calendar_id?: string | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          is_running?: boolean | null;
          last_paused?: string | null;
          last_start?: string | null;
          study_id?: string | null;
          time_rate?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "timer_calendar_id_fkey";
            columns: ["calendar_id"];
            isOneToOne: false;
            referencedRelation: "calendar";
            referencedColumns: ["calendar_id"];
          },
          {
            foreignKeyName: "timer_study_id_fkey";
            columns: ["study_id"];
            isOneToOne: false;
            referencedRelation: "study";
            referencedColumns: ["study_id"];
          },
          {
            foreignKeyName: "timer_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
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
          study_time: number;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          name?: string | null;
          profile_img?: string | null;
          study_time?: number;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string | null;
          profile_img?: string | null;
          study_time?: number;
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
