/*
  # Create interactive_avatars table

  1. New Tables
    - `interactive_avatars`
      - `id` (uuid, primary key)
      - `name` (text, not null) - Avatar name/identifier
      - `description` (text) - Avatar description
      - `video_url` (text, not null) - Main avatar video URL
      - `thumbnail_url` (text) - Thumbnail image URL
      - `default_personality` (text) - Default personality type
      - `supported_languages` (jsonb) - Array of supported language codes
      - `demo_conversations` (jsonb) - Array of demo conversation objects
      - `voice_preview_url` (text) - Voice preview audio URL
      - `is_published` (boolean, default false) - Publication status
      - `order_index` (integer, default 0) - Display order
      - `metadata` (jsonb) - Additional metadata
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `interactive_avatars` table
    - Add policy for public read access to published avatars
    - Add policy for authenticated admin users to manage avatars
*/

CREATE TABLE IF NOT EXISTS interactive_avatars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  default_personality TEXT DEFAULT 'professional',
  supported_languages JSONB DEFAULT '[]'::jsonb,
  demo_conversations JSONB DEFAULT '[]'::jsonb,
  voice_preview_url TEXT,
  is_published BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE interactive_avatars ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published avatars
CREATE POLICY "Public can view published avatars"
  ON interactive_avatars
  FOR SELECT
  USING (is_published = true);

-- Policy: Authenticated users can view all avatars (for admin dashboard)
CREATE POLICY "Authenticated users can view all avatars"
  ON interactive_avatars
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert avatars
CREATE POLICY "Authenticated users can insert avatars"
  ON interactive_avatars
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update avatars
CREATE POLICY "Authenticated users can update avatars"
  ON interactive_avatars
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete avatars
CREATE POLICY "Authenticated users can delete avatars"
  ON interactive_avatars
  FOR DELETE
  TO authenticated
  USING (true);