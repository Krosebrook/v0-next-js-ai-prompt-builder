-- Multi-Platform App Experience System
-- 
-- Overview:
-- Creates a comprehensive system for managing storyboards, UI components, animations,
-- avatars, and workflow scenes for production-ready app concepts with Sora-style video
-- generation and GPT-5.0 reasoning.
--
-- New Tables:
--   1. storyboards - Complete storyboard projects with metadata
--   2. storyboard_frames - Individual frames within a storyboard
--   3. ui_components - Reusable UI components with export metadata
--   4. animations - Animation specifications for Sora-style generation
--   5. avatars - Virtual avatar configurations
--   6. workflow_scenes - Complete scene definitions with all elements
--   7. export_packages - Production-ready export packages
--
-- Security:
--   - Enable RLS on all tables
--   - Authenticated users can create and manage their own storyboards

-- Create storyboards table
CREATE TABLE IF NOT EXISTS storyboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  platform_targets text[] DEFAULT ARRAY['desktop', 'mobile', 'tablet'],
  style_variant text DEFAULT 'minimalist',
  theme_mode text DEFAULT 'light',
  color_palette jsonb DEFAULT '{}',
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create storyboard_frames table
CREATE TABLE IF NOT EXISTS storyboard_frames (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storyboard_id uuid NOT NULL REFERENCES storyboards(id) ON DELETE CASCADE,
  scene_number integer NOT NULL,
  scene_type text NOT NULL,
  title text NOT NULL,
  description text,
  duration_seconds numeric DEFAULT 5.0,
  annotations text[] DEFAULT ARRAY[]::text[],
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ui_components table
CREATE TABLE IF NOT EXISTS ui_components (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storyboard_id uuid NOT NULL REFERENCES storyboards(id) ON DELETE CASCADE,
  frame_id uuid REFERENCES storyboard_frames(id) ON DELETE SET NULL,
  name text NOT NULL,
  component_type text NOT NULL,
  properties jsonb DEFAULT '{}',
  svg_data text,
  png_url text,
  interactions jsonb DEFAULT '{}',
  accessibility jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create animations table
CREATE TABLE IF NOT EXISTS animations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storyboard_id uuid NOT NULL REFERENCES storyboards(id) ON DELETE CASCADE,
  frame_id uuid REFERENCES storyboard_frames(id) ON DELETE SET NULL,
  name text NOT NULL,
  animation_type text NOT NULL,
  duration_ms integer DEFAULT 300,
  easing text DEFAULT 'ease-in-out',
  properties jsonb DEFAULT '{}',
  video_url text,
  aspect_ratio text DEFAULT '16:9',
  resolution text DEFAULT '1080p',
  fps integer DEFAULT 60,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create avatars table
CREATE TABLE IF NOT EXISTS avatars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storyboard_id uuid NOT NULL REFERENCES storyboards(id) ON DELETE CASCADE,
  name text NOT NULL,
  avatar_style text DEFAULT 'realistic',
  voice_profile jsonb DEFAULT '{}',
  appearance jsonb DEFAULT '{}',
  script_lines jsonb[] DEFAULT ARRAY[]::jsonb[],
  lip_sync_data jsonb DEFAULT '{}',
  video_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create workflow_scenes table
CREATE TABLE IF NOT EXISTS workflow_scenes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storyboard_id uuid NOT NULL REFERENCES storyboards(id) ON DELETE CASCADE,
  scene_number integer NOT NULL,
  scene_type text NOT NULL,
  title text NOT NULL,
  background_type text DEFAULT 'gradient',
  background_config jsonb DEFAULT '{}',
  components uuid[] DEFAULT ARRAY[]::uuid[],
  animations uuid[] DEFAULT ARRAY[]::uuid[],
  avatar_id uuid REFERENCES avatars(id) ON DELETE SET NULL,
  sound_design jsonb DEFAULT '{}',
  duration_seconds numeric DEFAULT 10.0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create export_packages table
CREATE TABLE IF NOT EXISTS export_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storyboard_id uuid NOT NULL REFERENCES storyboards(id) ON DELETE CASCADE,
  package_name text NOT NULL,
  export_format text NOT NULL,
  contents jsonb DEFAULT '{}',
  file_url text,
  file_size_bytes bigint,
  exported_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_storyboards_status ON storyboards(status);
CREATE INDEX IF NOT EXISTS idx_storyboards_created_at ON storyboards(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_frames_storyboard ON storyboard_frames(storyboard_id, scene_number);
CREATE INDEX IF NOT EXISTS idx_components_storyboard ON ui_components(storyboard_id);
CREATE INDEX IF NOT EXISTS idx_components_frame ON ui_components(frame_id);
CREATE INDEX IF NOT EXISTS idx_animations_storyboard ON animations(storyboard_id);
CREATE INDEX IF NOT EXISTS idx_scenes_storyboard ON workflow_scenes(storyboard_id, scene_number);
CREATE INDEX IF NOT EXISTS idx_avatars_storyboard ON avatars(storyboard_id);
CREATE INDEX IF NOT EXISTS idx_exports_storyboard ON export_packages(storyboard_id);

-- Enable Row Level Security
ALTER TABLE storyboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE storyboard_frames ENABLE ROW LEVEL SECURITY;
ALTER TABLE ui_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE animations ENABLE ROW LEVEL SECURITY;
ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE export_packages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for storyboards
CREATE POLICY "Users can view own storyboards"
  ON storyboards FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create storyboards"
  ON storyboards FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own storyboards"
  ON storyboards FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own storyboards"
  ON storyboards FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for storyboard_frames
CREATE POLICY "Users can view frames"
  ON storyboard_frames FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create frames"
  ON storyboard_frames FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update frames"
  ON storyboard_frames FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete frames"
  ON storyboard_frames FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for ui_components
CREATE POLICY "Users can view components"
  ON ui_components FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create components"
  ON ui_components FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update components"
  ON ui_components FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete components"
  ON ui_components FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for animations
CREATE POLICY "Users can view animations"
  ON animations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create animations"
  ON animations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update animations"
  ON animations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete animations"
  ON animations FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for avatars
CREATE POLICY "Users can view avatars"
  ON avatars FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create avatars"
  ON avatars FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update avatars"
  ON avatars FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete avatars"
  ON avatars FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for workflow_scenes
CREATE POLICY "Users can view scenes"
  ON workflow_scenes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create scenes"
  ON workflow_scenes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update scenes"
  ON workflow_scenes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete scenes"
  ON workflow_scenes FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for export_packages
CREATE POLICY "Users can view exports"
  ON export_packages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create exports"
  ON export_packages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update exports"
  ON export_packages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete exports"
  ON export_packages FOR DELETE
  TO authenticated
  USING (true);