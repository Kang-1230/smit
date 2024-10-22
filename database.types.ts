yarn run v1.22.22
$ C:\Users\ichik\Desktop\smit\node_modules\.bin\supabase gen types typescript --project-id nkzghifllapgjxacdfbr
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calender: {
        Row: {
          calender_id: string
          plan: string | null
          plan_date: string | null
          study_id: string
          user_id: string
        }
        Insert: {
          calender_id?: string
          plan?: string | null
          plan_date?: string | null
          study_id?: string
          user_id: string
        }
        Update: {
          calender_id?: string
          plan?: string | null
          plan_date?: string | null
          study_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calender_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "study"
            referencedColumns: ["study_id"]
          },
        ]
      }
      comment: {
        Row: {
          comment_contents: string | null
          comment_createtime: string | null
          comment_id: string
          comment_updatetime: string | null
          post_id: string
          user_id: string | null
        }
        Insert: {
          comment_contents?: string | null
          comment_createtime?: string | null
          comment_id?: string
          comment_updatetime?: string | null
          post_id?: string
          user_id?: string | null
        }
        Update: {
          comment_contents?: string | null
          comment_createtime?: string | null
          comment_id?: string
          comment_updatetime?: string | null
          post_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      post: {
        Row: {
          category: string | null
          post_contents: string | null
          post_createtime: string | null
          post_id: number
          post_updatetime: string | null
          study_id: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          post_contents?: string | null
          post_createtime?: string | null
          post_id?: number
          post_updatetime?: string | null
          study_id?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          post_contents?: string | null
          post_createtime?: string | null
          post_id?: number
          post_updatetime?: string | null
          study_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "study"
            referencedColumns: ["study_id"]
          },
        ]
      }
      study: {
        Row: {
          study_category: string | null
          study_createtime: string | null
          study_id: string
          study_maneger: string | null
          study_max_people: number | null
          study_name: string
          study_period: string | null
          study_score: number | null
        }
        Insert: {
          study_category?: string | null
          study_createtime?: string | null
          study_id?: string
          study_maneger?: string | null
          study_max_people?: number | null
          study_name: string
          study_period?: string | null
          study_score?: number | null
        }
        Update: {
          study_category?: string | null
          study_createtime?: string | null
          study_id?: string
          study_maneger?: string | null
          study_max_people?: number | null
          study_name?: string
          study_period?: string | null
          study_score?: number | null
        }
        Relationships: []
      }
      study_applylist: {
        Row: {
          id: string
          is_approved: boolean | null
          study_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          is_approved?: boolean | null
          study_id?: string | null
          user_id?: string
        }
        Update: {
          id?: string
          is_approved?: boolean | null
          study_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_applylist_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "study"
            referencedColumns: ["study_id"]
          },
          {
            foreignKeyName: "study_applylist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      study_content: {
        Row: {
          create_time: string | null
          study_content: string | null
          study_content_title: string | null
          study_id: string
        }
        Insert: {
          create_time?: string | null
          study_content?: string | null
          study_content_title?: string | null
          study_id?: string
        }
        Update: {
          create_time?: string | null
          study_content?: string | null
          study_content_title?: string | null
          study_id?: string
        }
        Relationships: []
      }
      study_goal: {
        Row: {
          goal_name: string | null
          is_success: boolean | null
          study_id: string
          user_id: string
        }
        Insert: {
          goal_name?: string | null
          is_success?: boolean | null
          study_id?: string
          user_id: string
        }
        Update: {
          goal_name?: string | null
          is_success?: boolean | null
          study_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_goal_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: true
            referencedRelation: "study"
            referencedColumns: ["study_id"]
          },
        ]
      }
      timer: {
        Row: {
          is_start: boolean | null
          study_id: string
          user_id: string
        }
        Insert: {
          is_start?: boolean | null
          study_id?: string
          user_id?: string
        }
        Update: {
          is_start?: boolean | null
          study_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "timer_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "study"
            referencedColumns: ["study_id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_random_nickname: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
Done in 3.97s.
