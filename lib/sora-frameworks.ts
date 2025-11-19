import type { Prompt, PromptVariable } from "./types"

// Sora 2 Prompt Frameworks based on official documentation and best practices
export const soraFrameworks: Omit<Prompt, "createdAt" | "updatedAt">[] = [
  // 1. Basic Sora 2 Shot - Simple structured approach
  {
    id: "sora-basic-shot",
    name: "Sora 2: Basic Shot Structure",
    template: `{scene_description}

Cinematography:
Camera shot: {camera_shot}
Mood: {mood}

Actions:
{actions}

Dialogue:
{dialogue}

Background Sound:
{background_sound}`,
    variables: [
      {
        name: "scene_description",
        label: "Scene Description",
        type: "textarea",
        placeholder: "Describe the setting, characters, lighting, and atmosphere in detail...",
        required: true,
      },
      {
        name: "camera_shot",
        label: "Camera Shot & Angle",
        type: "text",
        placeholder: "e.g., wide establishing shot, eye level",
        defaultValue: "medium shot, eye level",
      },
      {
        name: "mood",
        label: "Overall Mood",
        type: "text",
        placeholder: "e.g., cinematic and tense, playful and suspenseful",
        defaultValue: "cinematic",
      },
      {
        name: "actions",
        label: "Action Beats (one per line)",
        type: "textarea",
        placeholder: "- Action 1: specific gesture or movement\n- Action 2: another beat\n- Action 3: final action",
      },
      {
        name: "dialogue",
        label: "Dialogue (if any)",
        type: "textarea",
        placeholder: 'Character: "Line of dialogue here"',
      },
      {
        name: "background_sound",
        label: "Background Sound",
        type: "text",
        placeholder: "e.g., distant traffic, rain pattering, soft music",
      },
    ],
    tags: ["sora", "video-generation", "basic", "structure"],
    category: "video",
    isFavorite: false,
    isFramework: true,
    version: 1,
    revisions: [],
  },

  // 2. Cinematic Sora 2 - Ultra-detailed professional approach
  {
    id: "sora-cinematic-detailed",
    name: "Sora 2: Cinematic Ultra-Detailed",
    template: `Format & Look
Duration {duration}s; {shutter_angle}° shutter; {film_format}; {grain_style}; {special_effects}.

Lenses & Filtration
{lens_setup}; {filtration}; {lens_notes}.

Grade / Palette
Highlights: {highlights}
Mids: {midtones}
Blacks: {blacks}

Lighting & Atmosphere
{lighting_setup}
Bounce: {bounce_setup}
Negative fill: {negative_fill}
Practical: {practical_lights}
Atmos: {atmosphere}

Location & Framing
{location_description}
Foreground: {foreground}
Midground: {midground}
Background: {background}
{framing_notes}

Wardrobe / Props / Extras
Main subject: {main_subject}
Extras: {extras}
Props: {props}

Sound
{sound_design}

Shot List ({shot_count} shots /{duration}s total)
{shot_breakdown}

Camera Notes
{camera_notes}

Finishing
{finishing_notes}`,
    variables: [
      {
        name: "duration",
        label: "Duration (seconds)",
        type: "select",
        options: ["4", "8", "12"],
        defaultValue: "4",
        required: true,
      },
      {
        name: "shutter_angle",
        label: "Shutter Angle",
        type: "text",
        defaultValue: "180",
      },
      {
        name: "film_format",
        label: "Film Format",
        type: "text",
        placeholder: "e.g., 35mm, 65mm, digital capture",
        defaultValue: "digital capture emulating 35mm film",
      },
      {
        name: "grain_style",
        label: "Grain Style",
        type: "text",
        defaultValue: "fine grain",
      },
      {
        name: "special_effects",
        label: "Special Effects",
        type: "text",
        placeholder: "e.g., subtle halation on speculars, soft vignette",
      },
      {
        name: "lens_setup",
        label: "Lens Setup",
        type: "text",
        placeholder: "e.g., 35mm spherical prime, anamorphic 50mm",
        defaultValue: "35mm spherical prime",
      },
      {
        name: "filtration",
        label: "Filtration",
        type: "text",
        placeholder: "e.g., Black Pro-Mist 1/4, CPL",
      },
      {
        name: "lens_notes",
        label: "Lens Technical Notes",
        type: "text",
        placeholder: "Any specific lens behaviors or adjustments",
      },
      {
        name: "highlights",
        label: "Highlight Treatment",
        type: "text",
        placeholder: "e.g., clean morning sunlight with amber lift",
        required: true,
      },
      {
        name: "midtones",
        label: "Midtone Treatment",
        type: "text",
        placeholder: "e.g., balanced neutrals with slight teal cast",
        required: true,
      },
      {
        name: "blacks",
        label: "Black Level Treatment",
        type: "text",
        placeholder: "e.g., soft neutral with mild lift",
        required: true,
      },
      {
        name: "lighting_setup",
        label: "Primary Lighting",
        type: "textarea",
        placeholder: "Describe main light sources, direction, quality, and time of day",
        required: true,
      },
      {
        name: "bounce_setup",
        label: "Bounce Lighting",
        type: "text",
        placeholder: "e.g., 4×4 ultrabounce silver from camera left",
      },
      {
        name: "negative_fill",
        label: "Negative Fill",
        type: "text",
        placeholder: "Where shadows are deepened",
      },
      {
        name: "practical_lights",
        label: "Practical Lights",
        type: "text",
        placeholder: "e.g., table lamp, neon signs, streetlights",
      },
      {
        name: "atmosphere",
        label: "Atmospheric Effects",
        type: "text",
        placeholder: "e.g., gentle mist, haze, dust particles",
      },
      {
        name: "location_description",
        label: "Location & Setting",
        type: "textarea",
        placeholder: "Describe the location and overall framing setup",
        required: true,
      },
      {
        name: "foreground",
        label: "Foreground Elements",
        type: "text",
        placeholder: "What's in the foreground",
      },
      {
        name: "midground",
        label: "Midground Elements",
        type: "text",
        placeholder: "Main action/subject area",
        required: true,
      },
      {
        name: "background",
        label: "Background Elements",
        type: "text",
        placeholder: "Background details",
      },
      {
        name: "framing_notes",
        label: "Framing Notes",
        type: "text",
        placeholder: "e.g., Avoid signage, keep horizon level",
      },
      {
        name: "main_subject",
        label: "Main Subject Description",
        type: "textarea",
        placeholder: "Detailed description of main character/subject",
        required: true,
      },
      {
        name: "extras",
        label: "Background Extras",
        type: "text",
        placeholder: "Other people or characters in frame",
      },
      {
        name: "props",
        label: "Important Props",
        type: "text",
        placeholder: "Key objects that need to be visible",
      },
      {
        name: "sound_design",
        label: "Sound Design",
        type: "textarea",
        placeholder: "Diegetic sound, ambient noise, dialogue mixing notes",
      },
      {
        name: "shot_count",
        label: "Number of Shots",
        type: "number",
        defaultValue: "1",
        min: 1,
        max: 4,
      },
      {
        name: "shot_breakdown",
        label: "Detailed Shot Breakdown",
        type: "textarea",
        placeholder: "0.00-2.00 — Shot name (lens, camera move)\nDescription and purpose",
        required: true,
      },
      {
        name: "camera_notes",
        label: "Camera Technical Notes",
        type: "textarea",
        placeholder: "Why certain choices were made, what to preserve",
      },
      {
        name: "finishing_notes",
        label: "Post-Production Finishing",
        type: "textarea",
        placeholder: "Color grade, grain, mix notes, poster frame selection",
      },
    ],
    tags: ["sora", "video-generation", "cinematic", "professional", "detailed"],
    category: "video",
    isFavorite: false,
    isFramework: true,
    version: 1,
    revisions: [],
  },

  // 3. Sora 2 Cameo - Personal likeness
  {
    id: "sora-cameo-user",
    name: "Sora 2: User Cameo Generation",
    template: `Style: {style_description}

{scene_description}

Cinematography:
Camera: {camera_setup}
Lens: {lens_setup}
Lighting: {lighting_setup}
Mood: {mood}

Your Character Actions:
{character_actions}

Dialogue:
{dialogue}

Wardrobe: {wardrobe}
Props: {props}

Background Sound:
{background_sound}

Cameo Instructions:
- Use my personal cameo as the main character
- {cameo_specific_notes}`,
    variables: [
      {
        name: "style_description",
        label: "Visual Style",
        type: "text",
        placeholder: "e.g., 1990s documentary, modern commercial, cinematic drama",
        defaultValue: "cinematic and realistic",
        required: true,
      },
      {
        name: "scene_description",
        label: "Scene & Setting",
        type: "textarea",
        placeholder: "Describe the environment, lighting, time of day, and atmosphere",
        required: true,
      },
      {
        name: "camera_setup",
        label: "Camera Setup",
        type: "text",
        placeholder: "e.g., medium close-up, slow push-in",
        defaultValue: "medium shot at eye level",
      },
      {
        name: "lens_setup",
        label: "Lens Details",
        type: "text",
        placeholder: "e.g., 50mm, shallow depth of field",
        defaultValue: "natural focal length with balanced focus",
      },
      {
        name: "lighting_setup",
        label: "Lighting",
        type: "text",
        placeholder: "e.g., warm natural key from window, soft fill",
        required: true,
      },
      {
        name: "mood",
        label: "Overall Mood",
        type: "text",
        placeholder: "e.g., warm and inviting, professional, casual",
        required: true,
      },
      {
        name: "character_actions",
        label: "Your Actions in Scene",
        type: "textarea",
        placeholder: "- You turn toward camera and smile\n- You gesture while speaking\n- You walk forward three steps",
        required: true,
      },
      {
        name: "dialogue",
        label: "What You Say",
        type: "textarea",
        placeholder: 'You: "Your dialogue here"',
      },
      {
        name: "wardrobe",
        label: "What You're Wearing",
        type: "text",
        placeholder: "e.g., navy blazer, casual t-shirt, red dress",
      },
      {
        name: "props",
        label: "Props You Interact With",
        type: "text",
        placeholder: "e.g., coffee cup, phone, book",
      },
      {
        name: "background_sound",
        label: "Background Audio",
        type: "text",
        placeholder: "e.g., soft music, office ambience, outdoor sounds",
      },
      {
        name: "cameo_specific_notes",
        label: "Cameo-Specific Instructions",
        type: "textarea",
        placeholder: "Any specific instructions from your cameo rules (e.g., always wear glasses, specific expressions)",
      },
    ],
    tags: ["sora", "video-generation", "cameo", "personal", "user-likeness"],
    category: "video",
    isFavorite: false,
    isFramework: true,
    version: 1,
    revisions: [],
  },

  // 4. Sora 2 Character Cameo - For objects, pets, custom characters
  {
    id: "sora-character-cameo",
    name: "Sora 2: Character Cameo (Pet/Object)",
    template: `Style: {style_description}

{scene_description}

Cinematography:
Camera: {camera_setup}
Lighting: {lighting_setup}
Mood: {mood}

Character Details:
Character Handle: @{character_handle}
Character Type: {character_type}
{character_description}

Character Actions:
{character_actions}

Scene Actions:
{scene_actions}

Props & Environment:
{props_environment}

Background Sound:
{background_sound}

Character Instructions:
{character_instructions}`,
    variables: [
      {
        name: "style_description",
        label: "Visual Style",
        type: "text",
        placeholder: "e.g., whimsical animation, realistic commercial, stylized",
        required: true,
      },
      {
        name: "scene_description",
        label: "Scene & Setting",
        type: "textarea",
        placeholder: "Describe the environment and overall atmosphere",
        required: true,
      },
      {
        name: "camera_setup",
        label: "Camera Setup",
        type: "text",
        placeholder: "e.g., wide shot tracking the character",
        defaultValue: "medium shot following character",
      },
      {
        name: "lighting_setup",
        label: "Lighting",
        type: "text",
        placeholder: "e.g., bright natural light, dramatic spotlight",
        required: true,
      },
      {
        name: "mood",
        label: "Overall Mood",
        type: "text",
        placeholder: "e.g., playful, adventurous, cozy",
        required: true,
      },
      {
        name: "character_handle",
        label: "Character Handle/Name",
        type: "text",
        placeholder: "yourcharactername (without @)",
        required: true,
      },
      {
        name: "character_type",
        label: "Character Type",
        type: "select",
        options: ["Pet (dog)", "Pet (cat)", "Pet (other)", "Object", "Animated character", "Custom"],
        required: true,
      },
      {
        name: "character_description",
        label: "Character Description",
        type: "textarea",
        placeholder: "Describe your character's appearance, personality, distinctive features",
      },
      {
        name: "character_actions",
        label: "Character Actions",
        type: "textarea",
        placeholder: "- Character jumps onto table\n- Character looks at camera\n- Character moves to the right",
        required: true,
      },
      {
        name: "scene_actions",
        label: "Other Scene Actions",
        type: "textarea",
        placeholder: "What else happens in the scene besides the character's actions",
      },
      {
        name: "props_environment",
        label: "Props & Environment",
        type: "textarea",
        placeholder: "Important objects and environmental details",
      },
      {
        name: "background_sound",
        label: "Background Sound",
        type: "text",
        placeholder: "e.g., playful music, nature sounds, ambient noise",
      },
      {
        name: "character_instructions",
        label: "Character-Specific Instructions",
        type: "textarea",
        placeholder: "Any rules or preferences for how this character should appear",
      },
    ],
    tags: ["sora", "video-generation", "cameo", "character", "pet", "object"],
    category: "video",
    isFavorite: false,
    isFramework: true,
    version: 1,
    revisions: [],
  },

  // 5. Sora 2 Multi-Character Scene
  {
    id: "sora-multi-character",
    name: "Sora 2: Multi-Character Scene",
    template: `Style: {style_description}

{scene_description}

Cinematography:
Camera: {camera_setup}
Lens: {lens_setup}
Lighting: {lighting_setup}
Mood: {mood}

Characters:
{character_descriptions}

Actions & Blocking:
{blocking}

Dialogue:
{dialogue}

Props & Set Dressing:
{props}

Background Sound:
{background_sound}

NOTE: Maximum 2 cameos per video. Additional characters will be generated by the model.`,
    variables: [
      {
        name: "style_description",
        label: "Visual Style",
        type: "text",
        placeholder: "e.g., indie drama, comedy sketch, documentary interview",
        required: true,
      },
      {
        name: "scene_description",
        label: "Scene & Setting",
        type: "textarea",
        placeholder: "Describe location, time of day, atmosphere",
        required: true,
      },
      {
        name: "camera_setup",
        label: "Camera Setup",
        type: "text",
        placeholder: "e.g., two-shot, over-the-shoulder alternating",
        defaultValue: "medium two-shot",
      },
      {
        name: "lens_setup",
        label: "Lens Details",
        type: "text",
        placeholder: "e.g., 50mm with moderate depth of field",
      },
      {
        name: "lighting_setup",
        label: "Lighting",
        type: "textarea",
        placeholder: "Describe lighting setup for multiple subjects",
        required: true,
      },
      {
        name: "mood",
        label: "Overall Mood",
        type: "text",
        placeholder: "e.g., tense confrontation, warm conversation",
        required: true,
      },
      {
        name: "character_descriptions",
        label: "Character Descriptions",
        type: "textarea",
        placeholder: "Character 1: [description, wardrobe]\nCharacter 2: [description, wardrobe]\nNote if using cameos: @cameohandle",
        required: true,
      },
      {
        name: "blocking",
        label: "Actions & Blocking",
        type: "textarea",
        placeholder: "- Character 1 enters from left\n- Character 2 turns to face them\n- They exchange glances",
        required: true,
      },
      {
        name: "dialogue",
        label: "Dialogue Exchange",
        type: "textarea",
        placeholder: 'Character 1: "First line"\nCharacter 2: "Response"',
      },
      {
        name: "props",
        label: "Props & Set Dressing",
        type: "textarea",
        placeholder: "Important objects and environmental details",
      },
      {
        name: "background_sound",
        label: "Background Sound",
        type: "text",
        placeholder: "Ambient sound, music, environmental audio",
      },
    ],
    tags: ["sora", "video-generation", "multi-character", "dialogue", "scene"],
    category: "video",
    isFavorite: false,
    isFramework: true,
    version: 1,
    revisions: [],
  },

  // 6. Sora 2 Camera Movement Focus
  {
    id: "sora-camera-movement",
    name: "Sora 2: Camera Movement Focused",
    template: `Style: {style_description}

{scene_description}

Camera Movement:
Type: {movement_type}
Speed: {movement_speed}
Path: {movement_path}
Motivation: {movement_motivation}

Shot Details:
Framing: {framing}
Lens: {lens}
Focus: {focus_control}

Subject & Action:
{subject_action}

Lighting:
{lighting}

Mood: {mood}

Background Sound:
{background_sound}

Camera Technical Notes:
{camera_notes}`,
    variables: [
      {
        name: "style_description",
        label: "Visual Style",
        type: "text",
        placeholder: "e.g., dynamic action, smooth tracking shot, aerial establishing",
        required: true,
      },
      {
        name: "scene_description",
        label: "Scene & Setting",
        type: "textarea",
        placeholder: "Describe the environment",
        required: true,
      },
      {
        name: "movement_type",
        label: "Camera Movement Type",
        type: "select",
        options: [
          "Static (locked off)",
          "Pan (horizontal)",
          "Tilt (vertical)",
          "Dolly in",
          "Dolly out",
          "Tracking shot",
          "Crane up",
          "Crane down",
          "Orbit/Arc",
          "Handheld drift",
          "Aerial descent",
          "Aerial rise",
          "Push-in on subject",
        ],
        required: true,
      },
      {
        name: "movement_speed",
        label: "Movement Speed",
        type: "select",
        options: ["Very slow", "Slow", "Moderate", "Fast", "Very fast"],
        defaultValue: "Moderate",
      },
      {
        name: "movement_path",
        label: "Movement Path",
        type: "text",
        placeholder: "e.g., left to right, circling around subject, ascending vertically",
        required: true,
      },
      {
        name: "movement_motivation",
        label: "Movement Motivation",
        type: "text",
        placeholder: "Why the camera moves this way (reveals information, follows action, etc.)",
      },
      {
        name: "framing",
        label: "Shot Framing",
        type: "text",
        placeholder: "e.g., wide shot, medium close-up, extreme close-up",
        required: true,
      },
      {
        name: "lens",
        label: "Lens Details",
        type: "text",
        placeholder: "e.g., 24mm wide-angle, 85mm portrait",
        defaultValue: "natural focal length",
      },
      {
        name: "focus_control",
        label: "Focus Control",
        type: "text",
        placeholder: "e.g., follows subject, rack focus from foreground to background",
      },
      {
        name: "subject_action",
        label: "Subject & Action",
        type: "textarea",
        placeholder: "What the subject does during the camera movement",
        required: true,
      },
      {
        name: "lighting",
        label: "Lighting Setup",
        type: "textarea",
        placeholder: "How lighting changes or reveals during camera movement",
        required: true,
      },
      {
        name: "mood",
        label: "Overall Mood",
        type: "text",
        placeholder: "e.g., dynamic energy, slow revelation, tense anticipation",
        required: true,
      },
      {
        name: "background_sound",
        label: "Background Sound",
        type: "text",
        placeholder: "Sound that complements the camera movement",
      },
      {
        name: "camera_notes",
        label: "Camera Technical Notes",
        type: "textarea",
        placeholder: "Any specific technical requirements for the camera movement",
      },
    ],
    tags: ["sora", "video-generation", "camera-movement", "cinematography", "dynamic"],
    category: "video",
    isFavorite: false,
    isFramework: true,
    version: 1,
    revisions: [],
  },

  // 7. Sora 2 Lighting Focused
  {
    id: "sora-lighting-focused",
    name: "Sora 2: Lighting Design Focused",
    template: `Style: {style_description}

{scene_description}

Lighting Design:
Key Light: {key_light}
Fill Light: {fill_light}
Back/Rim Light: {rim_light}
Practical Lights: {practical_lights}
Motivated Sources: {motivated_sources}

Color Temperature & Palette:
Primary: {primary_color_temp}
Secondary: {secondary_color_temp}
Palette: {color_palette}

Atmosphere & Quality:
{atmosphere}

Cinematography:
Camera: {camera_setup}
Lens: {lens_setup}

Subject & Action:
{subject_action}

Mood: {mood}

Background Sound:
{background_sound}

Lighting Technical Notes:
{lighting_notes}`,
    variables: [
      {
        name: "style_description",
        label: "Visual Style",
        type: "text",
        placeholder: "e.g., film noir, golden hour natural light, neon-lit night",
        required: true,
      },
      {
        name: "scene_description",
        label: "Scene & Setting",
        type: "textarea",
        placeholder: "Describe the environment and time of day",
        required: true,
      },
      {
        name: "key_light",
        label: "Key Light (Main Light)",
        type: "textarea",
        placeholder: "Source, direction, quality (hard/soft), color",
        required: true,
      },
      {
        name: "fill_light",
        label: "Fill Light",
        type: "text",
        placeholder: "Intensity, source, how it balances shadows",
      },
      {
        name: "rim_light",
        label: "Back/Rim Light",
        type: "text",
        placeholder: "Edge separation, color, intensity",
      },
      {
        name: "practical_lights",
        label: "Practical Lights in Scene",
        type: "textarea",
        placeholder: "Lamps, windows, neon signs, candles - visible light sources",
      },
      {
        name: "motivated_sources",
        label: "Motivated Light Sources",
        type: "text",
        placeholder: "What justifies the lighting (sun, window, street lights)",
      },
      {
        name: "primary_color_temp",
        label: "Primary Color Temperature",
        type: "select",
        options: ["Warm (tungsten/amber)", "Neutral (daylight)", "Cool (blue/teal)", "Mixed"],
        required: true,
      },
      {
        name: "secondary_color_temp",
        label: "Secondary Color Temperature",
        type: "text",
        placeholder: "Secondary or accent color temperatures",
      },
      {
        name: "color_palette",
        label: "Color Palette Keywords",
        type: "text",
        placeholder: "e.g., amber, teal, warm brown, cool blue, neon pink",
        required: true,
      },
      {
        name: "atmosphere",
        label: "Atmospheric Quality",
        type: "textarea",
        placeholder: "Haze, fog, dust, smoke, clarity - how light interacts with air",
      },
      {
        name: "camera_setup",
        label: "Camera Setup",
        type: "text",
        placeholder: "Framing and movement",
        required: true,
      },
      {
        name: "lens_setup",
        label: "Lens Details",
        type: "text",
        placeholder: "Focal length and characteristics",
      },
      {
        name: "subject_action",
        label: "Subject & Action",
        type: "textarea",
        placeholder: "What happens in the scene",
        required: true,
      },
      {
        name: "mood",
        label: "Overall Mood",
        type: "text",
        placeholder: "e.g., dramatic and moody, bright and hopeful, mysterious",
        required: true,
      },
      {
        name: "background_sound",
        label: "Background Sound",
        type: "text",
        placeholder: "Audio elements",
      },
      {
        name: "lighting_notes",
        label: "Lighting Technical Notes",
        type: "textarea",
        placeholder: "Specific lighting techniques, ratios, or effects to achieve",
      },
    ],
    tags: ["sora", "video-generation", "lighting", "cinematography", "color"],
    category: "video",
    isFavorite: false,
    isFramework: true,
    version: 1,
    revisions: [],
  },

  // 8. Sora 2 Animation Style
  {
    id: "sora-animation-style",
    name: "Sora 2: Animation Style",
    template: `Animation Style: {animation_style}
Technical Approach: {technical_approach}
Aesthetic: {aesthetic_description}

{scene_description}

Character Design:
{character_design}

Animation Details:
Movement Style: {movement_style}
Timing: {timing_notes}
Frame Rate Feel: {frame_rate_feel}

Cinematography:
Camera: {camera_setup}
Lighting: {lighting_setup}

Actions:
{actions}

Dialogue:
{dialogue}

Color Palette:
{color_palette}

Textures & Materials:
{textures}

Background Sound:
{background_sound}

Mood: {mood}`,
    variables: [
      {
        name: "animation_style",
        label: "Animation Style",
        type: "select",
        options: [
          "2D hand-drawn",
          "2D/3D hybrid",
          "Stop-motion feel",
          "Claymation",
          "Paper cutout",
          "Watercolor painted",
          "Pixel art",
          "Rotoscoped",
          "Anime/manga",
          "Vintage cartoon",
          "Modern 3D stylized",
        ],
        required: true,
      },
      {
        name: "technical_approach",
        label: "Technical Approach",
        type: "text",
        placeholder: "e.g., soft brush textures, clean vector lines, painterly strokes",
        required: true,
      },
      {
        name: "aesthetic_description",
        label: "Overall Aesthetic",
        type: "textarea",
        placeholder: "Describe the visual feel - cozy, whimsical, mechanical, organic, etc.",
        required: true,
      },
      {
        name: "scene_description",
        label: "Scene Description",
        type: "textarea",
        placeholder: "Describe the animated environment",
        required: true,
      },
      {
        name: "character_design",
        label: "Character Design",
        type: "textarea",
        placeholder: "Describe animated character(s) appearance, proportions, features",
        required: true,
      },
      {
        name: "movement_style",
        label: "Movement Style",
        type: "text",
        placeholder: "e.g., bouncy, fluid, jerky, exaggerated, realistic",
        required: true,
      },
      {
        name: "timing_notes",
        label: "Timing & Pacing",
        type: "text",
        placeholder: "Fast, slow, holds, anticipation",
      },
      {
        name: "frame_rate_feel",
        label: "Frame Rate Feel",
        type: "select",
        options: ["Smooth (high fps)", "Choppy (low fps/stop-motion)", "Variable (mixed)"],
        defaultValue: "Smooth (high fps)",
      },
      {
        name: "camera_setup",
        label: "Camera Setup",
        type: "text",
        placeholder: "Camera framing and movement in animated space",
        required: true,
      },
      {
        name: "lighting_setup",
        label: "Lighting in Animation",
        type: "textarea",
        placeholder: "How light is rendered in the animation style",
        required: true,
      },
      {
        name: "actions",
        label: "Animated Actions",
        type: "textarea",
        placeholder: "Specific movements and actions in beats",
        required: true,
      },
      {
        name: "dialogue",
        label: "Dialogue (if any)",
        type: "textarea",
        placeholder: 'Character: "Line of dialogue"',
      },
      {
        name: "color_palette",
        label: "Animation Color Palette",
        type: "text",
        placeholder: "Specific colors used in the animation",
        required: true,
      },
      {
        name: "textures",
        label: "Textures & Materials",
        type: "textarea",
        placeholder: "Surface qualities - matte, glossy, rough, paper texture, etc.",
      },
      {
        name: "background_sound",
        label: "Background Sound",
        type: "text",
        placeholder: "Audio that fits the animated style",
      },
      {
        name: "mood",
        label: "Overall Mood",
        type: "text",
        placeholder: "Emotional tone of the animation",
        required: true,
      },
    ],
    tags: ["sora", "video-generation", "animation", "stylized", "creative"],
    category: "video",
    isFavorite: false,
    isFramework: true,
    version: 1,
    revisions: [],
  },

  // 9. Sora 2 Product/Commercial
  {
    id: "sora-product-commercial",
    name: "Sora 2: Product/Commercial Shot",
    template: `Commercial Style: {commercial_style}
Brand Aesthetic: {brand_aesthetic}

Product Focus:
{product_description}

Scene & Setting:
{scene_description}

Cinematography:
Camera: {camera_setup}
Lens: {lens_setup}
Movement: {camera_movement}

Lighting:
{lighting_setup}

Product Reveal:
{product_reveal}

Actions:
{actions}

On-Screen Text/Graphics:
{text_elements}

Voiceover/Dialogue:
{voiceover}

Color Palette:
{color_palette}

Background Sound:
{background_sound}

Brand Message:
{brand_message}`,
    variables: [
      {
        name: "commercial_style",
        label: "Commercial Style",
        type: "select",
        options: [
          "Luxury high-end",
          "Tech modern",
          "Lifestyle casual",
          "Documentary real",
          "Energetic dynamic",
          "Minimalist clean",
          "Cinematic dramatic",
        ],
        required: true,
      },
      {
        name: "brand_aesthetic",
        label: "Brand Aesthetic",
        type: "text",
        placeholder: "e.g., premium and sophisticated, youthful and vibrant",
        required: true,
      },
      {
        name: "product_description",
        label: "Product Description",
        type: "textarea",
        placeholder: "Detailed description of the product being showcased",
        required: true,
      },
      {
        name: "scene_description",
        label: "Scene & Environment",
        type: "textarea",
        placeholder: "Where the product is shown and the setting",
        required: true,
      },
      {
        name: "camera_setup",
        label: "Camera Setup",
        type: "text",
        placeholder: "e.g., close-up beauty shot, wide lifestyle shot",
        required: true,
      },
      {
        name: "lens_setup",
        label: "Lens Details",
        type: "text",
        placeholder: "e.g., macro 100mm, 35mm for context",
      },
      {
        name: "camera_movement",
        label: "Camera Movement",
        type: "text",
        placeholder: "e.g., slow dolly-in, orbit around product, static",
        required: true,
      },
      {
        name: "lighting_setup",
        label: "Product Lighting",
        type: "textarea",
        placeholder: "How the product is lit to look its best",
        required: true,
      },
      {
        name: "product_reveal",
        label: "Product Reveal Moment",
        type: "textarea",
        placeholder: "How and when the product is revealed or featured",
        required: true,
      },
      {
        name: "actions",
        label: "Actions/Interactions",
        type: "textarea",
        placeholder: "How people interact with the product or how it moves",
      },
      {
        name: "text_elements",
        label: "On-Screen Text/Graphics",
        type: "textarea",
        placeholder: "Product name, tagline, key features to highlight",
      },
      {
        name: "voiceover",
        label: "Voiceover/Dialogue",
        type: "textarea",
        placeholder: "Script for voiceover or dialogue",
      },
      {
        name: "color_palette",
        label: "Brand Color Palette",
        type: "text",
        placeholder: "Brand colors to feature",
        required: true,
      },
      {
        name: "background_sound",
        label: "Background Sound/Music",
        type: "text",
        placeholder: "Music style or sound design",
      },
      {
        name: "brand_message",
        label: "Core Brand Message",
        type: "text",
        placeholder: "The emotional message or takeaway",
        required: true,
      },
    ],
    tags: ["sora", "video-generation", "commercial", "product", "advertising", "brand"],
    category: "video",
    isFavorite: false,
    isFramework: true,
    version: 1,
    revisions: [],
  },

  // 10. Sora 2 Documentary/Interview
  {
    id: "sora-documentary-interview",
    name: "Sora 2: Documentary Interview Style",
    template: `Documentary Style: {documentary_style}
Time Period: {time_period}

Interview Setting:
{setting_description}

Subject Description:
{subject_description}

Cinematography:
Camera: {camera_setup}
Lens: {lens_setup}
Framing: {framing_notes}

Lighting:
{lighting_setup}

Interview Content:
{interview_content}

B-Roll Elements:
{broll_elements}

Archival Feel:
{archival_notes}

Background Environment:
{background_details}

Background Sound:
{background_sound}

Mood: {mood}`,
    variables: [
      {
        name: "documentary_style",
        label: "Documentary Style",
        type: "select",
        options: [
          "Modern HD documentary",
          "1990s documentary",
          "1970s film documentary",
          "Vintage news reel",
          "Ken Burns style",
          "Verité handheld",
          "Formal interview",
        ],
        required: true,
      },
      {
        name: "time_period",
        label: "Time Period/Era",
        type: "text",
        placeholder: "When this documentary is set or filmed",
      },
      {
        name: "setting_description",
        label: "Interview Setting",
        type: "textarea",
        placeholder: "Where the interview takes place - study, outdoor location, studio",
        required: true,
      },
      {
        name: "subject_description",
        label: "Interview Subject",
        type: "textarea",
        placeholder: "Description of the person being interviewed - age, appearance, demeanor",
        required: true,
      },
      {
        name: "camera_setup",
        label: "Camera Setup",
        type: "text",
        placeholder: "e.g., medium close-up, slightly off-center, eye-level",
        defaultValue: "medium close-up, slightly off-center",
      },
      {
        name: "lens_setup",
        label: "Lens Details",
        type: "text",
        placeholder: "e.g., 50mm, natural depth of field",
      },
      {
        name: "framing_notes",
        label: "Framing Notes",
        type: "text",
        placeholder: "Rule of thirds, headroom, looking room",
      },
      {
        name: "lighting_setup",
        label: "Interview Lighting",
        type: "textarea",
        placeholder: "Three-point lighting, natural light, dramatic shadows",
        required: true,
      },
      {
        name: "interview_content",
        label: "Interview Content",
        type: "textarea",
        placeholder: 'Subject: "What they say in the interview..."',
        required: true,
      },
      {
        name: "broll_elements",
        label: "B-Roll Elements",
        type: "textarea",
        placeholder: "Cutaway shots mentioned or shown - photos, objects, locations",
      },
      {
        name: "archival_notes",
        label: "Archival/Vintage Feel",
        type: "text",
        placeholder: "Film grain, color grade, wear and tear for period feel",
      },
      {
        name: "background_details",
        label: "Background Environment",
        type: "textarea",
        placeholder: "What's visible behind the subject - bookshelves, windows, etc.",
      },
      {
        name: "background_sound",
        label: "Background Audio",
        type: "text",
        placeholder: "Room tone, ambient sound, music bed",
      },
      {
        name: "mood",
        label: "Overall Mood",
        type: "text",
        placeholder: "e.g., intimate and reflective, authoritative, nostalgic",
        required: true,
      },
    ],
    tags: ["sora", "video-generation", "documentary", "interview", "talking-head"],
    category: "video",
    isFavorite: false,
    isFramework: true,
    version: 1,
    revisions: [],
  },
]
