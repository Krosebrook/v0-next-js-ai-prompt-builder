export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      storyboards: {
        Row: {
          id: string
          name: string
          description: string | null
          platform_targets: string[]
          style_variant: string
          theme_mode: string
          color_palette: Json
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          platform_targets?: string[]
          style_variant?: string
          theme_mode?: string
          color_palette?: Json
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          platform_targets?: string[]
          style_variant?: string
          theme_mode?: string
          color_palette?: Json
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      storyboard_frames: {
        Row: {
          id: string
          storyboard_id: string
          scene_number: number
          scene_type: string
          title: string
          description: string | null
          duration_seconds: number
          annotations: string[]
          thumbnail_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          storyboard_id: string
          scene_number: number
          scene_type: string
          title: string
          description?: string | null
          duration_seconds?: number
          annotations?: string[]
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          storyboard_id?: string
          scene_number?: number
          scene_type?: string
          title?: string
          description?: string | null
          duration_seconds?: number
          annotations?: string[]
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ui_components: {
        Row: {
          id: string
          storyboard_id: string
          frame_id: string | null
          name: string
          component_type: string
          properties: Json
          svg_data: string | null
          png_url: string | null
          interactions: Json
          accessibility: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          storyboard_id: string
          frame_id?: string | null
          name: string
          component_type: string
          properties?: Json
          svg_data?: string | null
          png_url?: string | null
          interactions?: Json
          accessibility?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          storyboard_id?: string
          frame_id?: string | null
          name?: string
          component_type?: string
          properties?: Json
          svg_data?: string | null
          png_url?: string | null
          interactions?: Json
          accessibility?: Json
          created_at?: string
          updated_at?: string
        }
      }
      animations: {
        Row: {
          id: string
          storyboard_id: string
          frame_id: string | null
          name: string
          animation_type: string
          duration_ms: number
          easing: string
          properties: Json
          video_url: string | null
          aspect_ratio: string
          resolution: string
          fps: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          storyboard_id: string
          frame_id?: string | null
          name: string
          animation_type: string
          duration_ms?: number
          easing?: string
          properties?: Json
          video_url?: string | null
          aspect_ratio?: string
          resolution?: string
          fps?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          storyboard_id?: string
          frame_id?: string | null
          name?: string
          animation_type?: string
          duration_ms?: number
          easing?: string
          properties?: Json
          video_url?: string | null
          aspect_ratio?: string
          resolution?: string
          fps?: number
          created_at?: string
          updated_at?: string
        }
      }
      avatars: {
        Row: {
          id: string
          storyboard_id: string
          name: string
          avatar_style: string
          voice_profile: Json
          appearance: Json
          script_lines: Json[]
          lip_sync_data: Json
          video_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          storyboard_id: string
          name: string
          avatar_style?: string
          voice_profile?: Json
          appearance?: Json
          script_lines?: Json[]
          lip_sync_data?: Json
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          storyboard_id?: string
          name?: string
          avatar_style?: string
          voice_profile?: Json
          appearance?: Json
          script_lines?: Json[]
          lip_sync_data?: Json
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workflow_scenes: {
        Row: {
          id: string
          storyboard_id: string
          scene_number: number
          scene_type: string
          title: string
          background_type: string
          background_config: Json
          components: string[]
          animations: string[]
          avatar_id: string | null
          sound_design: Json
          duration_seconds: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          storyboard_id: string
          scene_number: number
          scene_type: string
          title: string
          background_type?: string
          background_config?: Json
          components?: string[]
          animations?: string[]
          avatar_id?: string | null
          sound_design?: Json
          duration_seconds?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          storyboard_id?: string
          scene_number?: number
          scene_type?: string
          title?: string
          background_type?: string
          background_config?: Json
          components?: string[]
          animations?: string[]
          avatar_id?: string | null
          sound_design?: Json
          duration_seconds?: number
          created_at?: string
          updated_at?: string
        }
      }
      export_packages: {
        Row: {
          id: string
          storyboard_id: string
          package_name: string
          export_format: string
          contents: Json
          file_url: string | null
          file_size_bytes: number | null
          exported_at: string
          created_at: string
        }
        Insert: {
          id?: string
          storyboard_id: string
          package_name: string
          export_format: string
          contents?: Json
          file_url?: string | null
          file_size_bytes?: number | null
          exported_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          storyboard_id?: string
          package_name?: string
          export_format?: string
          contents?: Json
          file_url?: string | null
          file_size_bytes?: number | null
          exported_at?: string
          created_at?: string
        }
      }
    }
  }
}
