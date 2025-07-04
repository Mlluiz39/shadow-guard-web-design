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
      agentes: {
        Row: {
          categoria: string
          cpf: string
          created_at: string | null
          email: string | null
          empresa: string
          id: string
          nome: string
          status: string
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          categoria: string
          cpf: string
          created_at?: string | null
          email?: string | null
          empresa: string
          id?: string
          nome: string
          status?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          categoria?: string
          cpf?: string
          created_at?: string | null
          email?: string | null
          empresa?: string
          id?: string
          nome?: string
          status?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          contrato: string | null
          created_at: string | null
          data_importacao: string | null
          documento: string
          id: string
          nome: string
          pasta_n: string | null
          razao_social: string | null
          status: string
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          contrato?: string | null
          created_at?: string | null
          data_importacao?: string | null
          documento: string
          id?: string
          nome: string
          pasta_n?: string | null
          razao_social?: string | null
          status?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          contrato?: string | null
          created_at?: string | null
          data_importacao?: string | null
          documento?: string
          id?: string
          nome?: string
          pasta_n?: string | null
          razao_social?: string | null
          status?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      config_financeiro: {
        Row: {
          ativo: boolean | null
          codigo: string | null
          created_at: string
          descricao: string | null
          id: string
          nome: string
          tipo: string
          updated_at: string
          valor: number | null
        }
        Insert: {
          ativo?: boolean | null
          codigo?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          tipo: string
          updated_at?: string
          valor?: number | null
        }
        Update: {
          ativo?: boolean | null
          codigo?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          tipo?: string
          updated_at?: string
          valor?: number | null
        }
        Relationships: []
      }
      config_operacional: {
        Row: {
          ativo: boolean | null
          created_at: string
          descricao: string | null
          id: string
          nome: string
          tipo: string
          updated_at: string
          valor: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          tipo: string
          updated_at?: string
          valor?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          tipo?: string
          updated_at?: string
          valor?: string | null
        }
        Relationships: []
      }
      empresas: {
        Row: {
          cnpj: string
          created_at: string | null
          email: string
          id: string
          nome: string
          proprietario: string
          updated_at: string | null
        }
        Insert: {
          cnpj: string
          created_at?: string | null
          email: string
          id?: string
          nome: string
          proprietario: string
          updated_at?: string | null
        }
        Update: {
          cnpj?: string
          created_at?: string | null
          email?: string
          id?: string
          nome?: string
          proprietario?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      frota: {
        Row: {
          ano: number | null
          combustivel: string | null
          cor: string | null
          created_at: string
          id: string
          marca: string
          modelo: string
          motorista_responsavel: string | null
          observacoes: string | null
          placa: string
          quilometragem: number | null
          status: string
          updated_at: string
        }
        Insert: {
          ano?: number | null
          combustivel?: string | null
          cor?: string | null
          created_at?: string
          id?: string
          marca: string
          modelo: string
          motorista_responsavel?: string | null
          observacoes?: string | null
          placa: string
          quilometragem?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          ano?: number | null
          combustivel?: string | null
          cor?: string | null
          created_at?: string
          id?: string
          marca?: string
          modelo?: string
          motorista_responsavel?: string | null
          observacoes?: string | null
          placa?: string
          quilometragem?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      funcionarios: {
        Row: {
          cargo: string | null
          cpf: string
          created_at: string
          data_admissao: string | null
          departamento: string | null
          email: string | null
          empresa: string | null
          endereco: string | null
          id: string
          nome: string
          rg: string | null
          salario: number | null
          status: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          cargo?: string | null
          cpf: string
          created_at?: string
          data_admissao?: string | null
          departamento?: string | null
          email?: string | null
          empresa?: string | null
          endereco?: string | null
          id?: string
          nome: string
          rg?: string | null
          salario?: number | null
          status?: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          cargo?: string | null
          cpf?: string
          created_at?: string
          data_admissao?: string | null
          departamento?: string | null
          email?: string | null
          empresa?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          rg?: string | null
          salario?: number | null
          status?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      mensagens_setores: {
        Row: {
          assunto: string | null
          created_at: string
          id: string
          lida: boolean | null
          mensagem: string
          remetente_id: string
          setor_destino_id: string
          setor_origem_id: string
          updated_at: string
        }
        Insert: {
          assunto?: string | null
          created_at?: string
          id?: string
          lida?: boolean | null
          mensagem: string
          remetente_id: string
          setor_destino_id: string
          setor_origem_id: string
          updated_at?: string
        }
        Update: {
          assunto?: string | null
          created_at?: string
          id?: string
          lida?: boolean | null
          mensagem?: string
          remetente_id?: string
          setor_destino_id?: string
          setor_origem_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensagens_setores_setor_destino_id_fkey"
            columns: ["setor_destino_id"]
            isOneToOne: false
            referencedRelation: "setores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensagens_setores_setor_origem_id_fkey"
            columns: ["setor_origem_id"]
            isOneToOne: false
            referencedRelation: "setores"
            referencedColumns: ["id"]
          },
        ]
      }
      operacoes: {
        Row: {
          agente: string
          cliente: string
          created_at: string | null
          data_operacao: string
          destino: string
          hora_inicio: string
          id: string
          observacoes: string | null
          origem: string
          status: string
          updated_at: string | null
          veiculo: string | null
        }
        Insert: {
          agente: string
          cliente: string
          created_at?: string | null
          data_operacao: string
          destino: string
          hora_inicio: string
          id?: string
          observacoes?: string | null
          origem: string
          status?: string
          updated_at?: string | null
          veiculo?: string | null
        }
        Update: {
          agente?: string
          cliente?: string
          created_at?: string | null
          data_operacao?: string
          destino?: string
          hora_inicio?: string
          id?: string
          observacoes?: string | null
          origem?: string
          status?: string
          updated_at?: string | null
          veiculo?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ativo: boolean
          cargo: string | null
          created_at: string | null
          departamento: string | null
          email: string
          empresa: string | null
          id: string
          nome: string
          perfil: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean
          cargo?: string | null
          created_at?: string | null
          departamento?: string | null
          email: string
          empresa?: string | null
          id: string
          nome: string
          perfil?: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean
          cargo?: string | null
          created_at?: string | null
          departamento?: string | null
          email?: string
          empresa?: string | null
          id?: string
          nome?: string
          perfil?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      setores: {
        Row: {
          created_at: string
          descricao: string | null
          id: string
          nome: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      solicitacoes_escolta: {
        Row: {
          agente_responsavel: string | null
          cliente: string
          created_at: string | null
          data_solicitacao: string
          destino: string
          hora_solicitacao: string
          id: string
          observacoes: string | null
          origem: string
          prioridade: string
          status: string
          tipo_servico: string
          updated_at: string | null
        }
        Insert: {
          agente_responsavel?: string | null
          cliente: string
          created_at?: string | null
          data_solicitacao: string
          destino: string
          hora_solicitacao: string
          id?: string
          observacoes?: string | null
          origem: string
          prioridade?: string
          status?: string
          tipo_servico: string
          updated_at?: string | null
        }
        Update: {
          agente_responsavel?: string | null
          cliente?: string
          created_at?: string | null
          data_solicitacao?: string
          destino?: string
          hora_solicitacao?: string
          id?: string
          observacoes?: string | null
          origem?: string
          prioridade?: string
          status?: string
          tipo_servico?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_profile: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_master: {
        Args: Record<PropertyKey, never>
        Returns: boolean
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
