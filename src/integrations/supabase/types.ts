export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          excerpt: string | null
          author: string | null
          status: string
          seo_title: string | null
          seo_description: string | null
          featured_image: string | null
          tags: string[] | null
          category: string | null
          published_at: string | null
          scheduled_for: string | null
          views: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          excerpt?: string | null
          author?: string | null
          status?: string
          seo_title?: string | null
          seo_description?: string | null
          featured_image?: string | null
          tags?: string[] | null
          category?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          views?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          excerpt?: string | null
          author?: string | null
          status?: string
          seo_title?: string | null
          seo_description?: string | null
          featured_image?: string | null
          tags?: string[] | null
          category?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          views?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      trends: {
        Row: {
          id: string
          topic: string
          source: string | null
          relevance_score: number | null
          keywords: string[] | null
          detected_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          topic: string
          source?: string | null
          relevance_score?: number | null
          keywords?: string[] | null
          detected_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          topic?: string
          source?: string | null
          relevance_score?: number | null
          keywords?: string[] | null
          detected_at?: string
          expires_at?: string | null
        }
        Relationships: []
      }
      content_generation_jobs: {
        Row: {
          id: string
          trend_id: string | null
          status: string | null
          title: string | null
          slug: string | null
          content: string | null
          error_message: string | null
          articles_generated: number | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          trend_id?: string | null
          status?: string | null
          title?: string | null
          slug?: string | null
          content?: string | null
          error_message?: string | null
          articles_generated?: number | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          trend_id?: string | null
          status?: string | null
          title?: string | null
          slug?: string | null
          content?: string | null
          error_message?: string | null
          articles_generated?: number | null
          created_at?: string
          completed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_generation_jobs_trend_id_fkey"
            columns: ["trend_id"]
            isOneToOne: false
            referencedRelation: "trends"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_results: {
        Row: {
          ai_summary: string | null
          category_scores: Json
          created_at: string
          estimated_revenue_loss: string | null
          findings: Json
          id: string
          maturity_level: string
          recommendations: Json
          scan_id: string
          score: number
        }
        Insert: {
          ai_summary?: string | null
          category_scores?: Json
          created_at?: string
          estimated_revenue_loss?: string | null
          findings?: Json
          id?: string
          maturity_level: string
          recommendations?: Json
          scan_id: string
          score: number
        }
        Update: {
          ai_summary?: string | null
          category_scores?: Json
          created_at?: string
          estimated_revenue_loss?: string | null
          findings?: Json
          id?: string
          maturity_level?: string
          recommendations?: Json
          scan_id?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "scan_results_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "scans"
            referencedColumns: ["id"]
          },
        ]
      }
      scans: {
        Row: {
          answers: Json
          completed_at: string | null
          contact_email: string | null
          contact_name: string | null
          created_at: string
          error_message: string | null
          id: string
          progress: number
          status: string
          website: string
        }
        Insert: {
          answers?: Json
          completed_at?: string | null
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          progress?: number
          status?: string
          website: string
        }
        Update: {
          answers?: Json
          completed_at?: string | null
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          progress?: number
          status?: string
          website?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
