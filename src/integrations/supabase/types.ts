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
      loan_products: {
        Row: {
          created_at: string
          id: string
          loanagent_id: string
          max_interest_rate: number
          max_loan_amount: number
          max_tenure: number
          min_interest_rate: number
          min_tenure: number
          processing_fee: number
          required_documents: string[] | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          loanagent_id: string
          max_interest_rate: number
          max_loan_amount: number
          max_tenure: number
          min_interest_rate: number
          min_tenure: number
          processing_fee: number
          required_documents?: string[] | null
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          loanagent_id?: string
          max_interest_rate?: number
          max_loan_amount?: number
          max_tenure?: number
          min_interest_rate?: number
          min_tenure?: number
          processing_fee?: number
          required_documents?: string[] | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loan_products_loanagent_id_fkey"
            columns: ["loanagent_id"]
            isOneToOne: false
            referencedRelation: "loanagents"
            referencedColumns: ["id"]
          },
        ]
      }
      loanagent_employment_types: {
        Row: {
          created_at: string
          employment_type: string
          id: string
          loanagent_id: string
        }
        Insert: {
          created_at?: string
          employment_type: string
          id?: string
          loanagent_id: string
        }
        Update: {
          created_at?: string
          employment_type?: string
          id?: string
          loanagent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loanagent_employment_types_loanagent_id_fkey"
            columns: ["loanagent_id"]
            isOneToOne: false
            referencedRelation: "loanagents"
            referencedColumns: ["id"]
          },
        ]
      }
      loanagents: {
        Row: {
          address: string | null
          apply_now_link: string | null
          city: string | null
          contact_number: string | null
          created_at: string
          description: string | null
          email: string | null
          google_maps_url: string | null
          id: string
          latitude: string | null
          logo_url: string | null
          longitude: string | null
          max_age: number | null
          min_age: number | null
          min_credit_score: number | null
          min_income: number | null
          name: string
          pincode: string | null
          state: string | null
          tagline: string | null
          updated_at: string
          user_id: string
          whatsapp_number: string | null
          working_hours: string | null
        }
        Insert: {
          address?: string | null
          apply_now_link?: string | null
          city?: string | null
          contact_number?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          google_maps_url?: string | null
          id?: string
          latitude?: string | null
          logo_url?: string | null
          longitude?: string | null
          max_age?: number | null
          min_age?: number | null
          min_credit_score?: number | null
          min_income?: number | null
          name: string
          pincode?: string | null
          state?: string | null
          tagline?: string | null
          updated_at?: string
          user_id: string
          whatsapp_number?: string | null
          working_hours?: string | null
        }
        Update: {
          address?: string | null
          apply_now_link?: string | null
          city?: string | null
          contact_number?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          google_maps_url?: string | null
          id?: string
          latitude?: string | null
          logo_url?: string | null
          longitude?: string | null
          max_age?: number | null
          min_age?: number | null
          min_credit_score?: number | null
          min_income?: number | null
          name?: string
          pincode?: string | null
          state?: string | null
          tagline?: string | null
          updated_at?: string
          user_id?: string
          whatsapp_number?: string | null
          working_hours?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      service_providers: {
        Row: {
          created_at: string
          id: string
          location: string
          name: string
          phone: string
          service_type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          name: string
          phone: string
          service_type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          name?: string
          phone?: string
          service_type?: string
          updated_at?: string
          user_id?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
