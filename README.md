# AI Prompt Builder

A production-grade web application for creating, managing, and executing reusable AI prompt templates with dynamic variables.

## Features

### Phase 1: Core UX & Framework Integration ✓
- **42 pre-built prompt frameworks** including:
  - **Sora 2 Video Generation** (10 frameworks): Basic shot structure, cinematic detailed, user cameo, character cameo, multi-character scenes, camera movement, lighting design, animation style, product/commercial, documentary/interview
  - **Automation & Workflow** (7 frameworks): Make.com, Zapier, n8n, Pipedream, LangChain, CrewAI, AutoGen
  - **Text Generation** (25 frameworks): COSTAR, APE, RACE, CRISPE, ROSES, TRACE, ROLE, Chain of Thought, Few-Shot, ReAct, and more
- **Dynamic Combination System**: AI-powered meta-prompts generated when multiple tags selected
- Smart framework initialization with version tracking
- Advanced search with debouncing (300ms)
- Multi-select tag filtering
- Category navigation (All, Favorites, Video (Sora), Automation, Frameworks, Custom, Recent)
- Sort options (name, date created, date updated)
- Favorites system
- Real-time prompt preview
- Keyboard shortcuts support

### Phase 2: Data Management & Persistence ✓
- Prompt versioning with full revision history (up to 10 revisions)
- Undo/redo via revision restore
- Advanced export system (JSON, YAML, Markdown)
- Bulk export/import (ZIP format)
- Shareable URLs with prompt encoding
- Duplicate prompt functionality
- Change descriptions for version tracking
- Abstract storage layer (ready for database migration)
- Comprehensive error handling with boundaries
- Zod validation for all data operations

## Dynamic Combination System

### Overview

When you select multiple tags (e.g., "meta" + "framework", "zapier" + "ai-agent", "make.com" + "sora"), the app dynamically generates intelligent meta-prompts that combine the best of both worlds. These combination prompts appear at the top of your search results with special styling.

### Supported Combinations

#### 1. Meta + Framework
Generates a **Meta-Framework Prompt Builder** that analyzes and synthesizes multiple prompting frameworks:
- Framework strength assessment
- Synergy identification
- Conflict resolution
- Optimal integration strategies

**Example Use Case**: Combine COSTAR structure with Chain of Thought reasoning for complex analytical tasks.

#### 2. Zapier + AI Agent
Creates a **Zapier AI Agent Builder** for intelligent automation:
- Agent personality configuration
- Decision-making logic
- Conditional workflow routing
- Error handling and fallbacks
- Multi-action orchestration

**Example Use Case**: Customer support agent that auto-classifies, routes, and responds to inquiries via Zapier.

#### 3. Make.com + Any Tag
Produces a **Make.com Scenario Builder** tailored to your specific need:
- Module configuration (trigger, AI, transformation, output)
- Router logic for conditional flows
- Data mapping between modules
- Error handling and retries
- Complete scenario JSON blueprint

**Example Use Case**: Select "make.com" + "content-generation" to build a content automation scenario.

#### 4. n8n + Any Tag
Generates an **n8n Workflow Builder** with comprehensive node setup:
- Trigger node configuration
- AI service integration (OpenAI, Anthropic, Ollama)
- Code/Function node logic
- Conditional branching (IF/Switch nodes)
- Complete workflow JSON

**Example Use Case**: Self-hosted workflow with "n8n" + "data-analysis" for privacy-focused automation.

#### 5. Sora + Descriptive Tags
Creates specialized **Sora Video Generation** prompts:
- **Sora + Camera**: Enhanced camera-focused prompts with lens, movement, framing
- **Sora + Character**: Character-centric prompts with cameo integration
- **Sora + Commercial**: Product showcase and advertising formats
- Dynamic scene setup based on selected style tags

**Example Use Case**: "sora" + "cinematic" + "camera-movement" generates a professional cinematography prompt.

### How to Use Combinations

1. **Select Multiple Tags**: Click on 2 or more tags in the tag filter
2. **View Dynamic Prompts**: Combination prompts appear at the top with a sparkle icon ✨
3. **Preview & Customize**: Click to view the generated meta-prompt structure
4. **Save or Export**: 
   - **Save as New Prompt**: Adds the combination to your library
   - **Use as Template**: Opens create page with pre-filled data
   - **Export**: Download JSON/YAML for external use

### Advanced Combination Features

- **Priority System**: Most specific combinations match first (e.g., "zapier" + "ai-agent" takes priority over generic "zapier" + any tag)
- **Smart Variable Generation**: Variables are dynamically created based on tag combinations
- **No Duplicates**: Combination prompts are generated in-memory and don't clutter your library unless you save them
- **Visual Distinction**: Gradient borders and sparkle icons clearly identify dynamic combinations

### Example Workflows

**Workflow 1: Build a Customer Support Automation**
\`\`\`
1. Select tags: "zapier" + "ai-agent" + "customer-support"
2. System generates: Zapier AI Agent Builder
3. Fill in: Agent role, decision criteria, actions
4. Save → Deploy to Zapier
\`\`\`

**Workflow 2: Create Video Content Pipeline**
\`\`\`
1. Select tags: "make.com" + "sora" + "commercial"
2. System generates: Make.com Scenario with Sora integration
3. Configure: Product inputs, video specs, distribution
4. Export JSON → Import to Make.com
\`\`\`

**Workflow 3: Meta-Framework for Analysis**
\`\`\`
1. Select tags: "meta" + "framework" + "analytical"
2. System generates: Meta-Framework combining COSTAR + CoT + Verification
3. Customize: Specific frameworks, success criteria
4. Use for complex reasoning tasks
\`\`\`

## File Structure

\`\`\`
├── app/
│   ├── page.tsx              # Home page with combination system
│   ├── create/page.tsx       # Create new prompt
│   ├── import/page.tsx       # Import from shareable URL
│   └── prompts/[id]/
│       ├── page.tsx          # Prompt detail view
│       └── edit/page.tsx     # Edit prompt
├── components/
│   ├── bulk-operations-menu.tsx
│   ├── category-sidebar.tsx
│   ├── error-boundary.tsx
│   ├── export-format-dialog.tsx
│   ├── revision-history-dialog.tsx
│   ├── prompt-card.tsx      # Handles combination prompts
│   ├── prompt-form.tsx
│   ├── prompt-preview.tsx
│   └── ...
├── lib/
│   ├── storage.ts            # LocalStorage adapter
│   ├── storage-adapter.ts    # Abstract adapter pattern
│   ├── types.ts              # TypeScript interfaces
│   ├── validation.ts         # Zod schemas
│   ├── export-utils.ts       # Export/import utilities
│   ├── prompt-frameworks.ts  # All 42 framework templates
│   ├── prompt-combinations.ts # Dynamic combination rules ⭐ NEW
│   ├── sora-frameworks.ts    # 10 Sora 2 video frameworks
│   ├── automation-frameworks.ts # 7 Automation & Workflow frameworks
│   └── seed-frameworks.ts    # Framework seeding logic
└── hooks/
    ├── use-debounce.ts
    ├── use-revision-history.ts
    └── use-prompt-export.ts
