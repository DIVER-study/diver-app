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
      badges: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      exercises: {
        Row: {
          answer: number
          explanation: string
          id: number
          module_id: number
          options: string[]
          question: string
        }
        Insert: {
          answer?: number
          explanation?: string
          id?: number
          module_id: number
          options?: string[]
          question?: string
        }
        Update: {
          answer?: number
          explanation?: string
          id?: number
          module_id?: number
          options?: string[]
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      library_blogs: {
        Row: {
          category: string
          id: number
          markdown: string
          slug: string
          title: string
        }
        Insert: {
          category: string
          id?: number
          markdown: string
          slug: string
          title: string
        }
        Update: {
          category?: string
          id?: number
          markdown?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      modules: {
        Row: {
          badge: number | null
          id: number
          subject_id: number
        }
        Insert: {
          badge?: number | null
          id?: number
          subject_id: number
        }
        Update: {
          badge?: number | null
          id?: number
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "modules_badge_fkey"
            columns: ["badge"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "modules_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          accepted_ranking: boolean
          avatar_url: string
          badges: number[]
          display_name: string
          email: string
          id: string
          updated_at: string
          xp: number
        }
        Insert: {
          accepted_ranking?: boolean
          avatar_url?: string
          badges?: number[]
          display_name?: string
          email: string
          id: string
          updated_at?: string
          xp?: number
        }
        Update: {
          accepted_ranking?: boolean
          avatar_url?: string
          badges?: number[]
          display_name?: string
          email?: string
          id?: string
          updated_at?: string
          xp?: number
        }
        Relationships: []
      }
      subjects: {
        Row: {
          description: string
          id: number
          name: string
          orientation: string
          realm: Database["public"]["Enums"]["realms"]
          slug: string
        }
        Insert: {
          description?: string
          id?: number
          name?: string
          orientation?: string
          realm?: Database["public"]["Enums"]["realms"]
          slug?: string
        }
        Update: {
          description?: string
          id?: number
          name?: string
          orientation?: string
          realm?: Database["public"]["Enums"]["realms"]
          slug?: string
        }
        Relationships: []
      }
      user_completed_modules: {
        Row: {
          completed: boolean
          id: number
          module_id: number
          realm: Database["public"]["Enums"]["realms"]
          subject_id: number
          user_id: string
        }
        Insert: {
          completed?: boolean
          id?: number
          module_id?: number
          realm?: Database["public"]["Enums"]["realms"]
          subject_id?: number
          user_id?: string
        }
        Update: {
          completed?: boolean
          id?: number
          module_id?: number
          realm?: Database["public"]["Enums"]["realms"]
          subject_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_completed_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_completed_modules_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_completed_modules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      realms: "behaviorism" | "gestalt" | "tsc"
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
