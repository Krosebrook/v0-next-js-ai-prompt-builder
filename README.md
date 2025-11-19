# AI Prompt Builder

A production-grade web application for creating, managing, and executing reusable AI prompt templates with dynamic variables.

## Features

### Phase 1: Core UX & Framework Integration ✓
- **42 pre-built prompt frameworks** including:
  - **Sora 2 Video Generation** (10 frameworks): Basic shot structure, cinematic detailed, user cameo, character cameo, multi-character scenes, camera movement, lighting design, animation style, product/commercial, documentary/interview
  - **Automation & Workflow** (7 frameworks): Make.com, Zapier, n8n, Pipedream, LangChain, CrewAI, AutoGen
  - **Text Generation** (25 frameworks): COSTAR, APE, RACE, CRISPE, ROSES, TRACE, ROLE, Chain of Thought, Few-Shot, ReAct, and more
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

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19, Tailwind CSS, shadcn/ui
- **Type Safety**: TypeScript (strict mode)
- **Validation**: Zod schemas
- **Storage**: LocalStorage (MVP) with adapter pattern for future DB integration
- **State Management**: React hooks + debouncing

## Getting Started

### Installation

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage

### Creating a Prompt

1. Click "Create Prompt" button
2. Enter prompt name and template
3. Use `{variable_name}` syntax for dynamic variables
4. Configure variable types and options
5. Preview in real-time
6. Save with optional change description

### Using Frameworks

The app comes with 42 pre-built prompt frameworks:

#### Video Generation (Sora 2) - 10 Frameworks
Based on OpenAI's official Sora 2 prompting guide and best practices:
- **Basic Shot Structure**: Simple, structured approach for video generation
- **Cinematic Ultra-Detailed**: Professional cinematography with full technical specs
- **User Cameo Generation**: Personal likeness integration for yourself
- **Character Cameo (Pet/Object)**: Custom characters from pets, objects, or animations
- **Multi-Character Scene**: Complex scenes with multiple subjects
- **Camera Movement Focused**: Dynamic camera work and motion
- **Lighting Design Focused**: Professional lighting setups and color grading
- **Animation Style**: Hand-drawn, stop-motion, and stylized animation
- **Product/Commercial Shot**: Professional product showcases
- **Documentary/Interview Style**: Interview and documentary formats

#### Automation & Workflow - 7 Frameworks
Conversational prompt frameworks for popular automation platforms based on the provided workflows:

- **Make.com Conversational Workflow**: Multi-step workflows with triggers, actions, and error handling
  - Define workflow in natural language
  - Specify trigger events (webhooks, schedules, app events)
  - Chain actions with data transformations
  - Configure error handling strategies
  
- **Zapier Conversational Zap**: Simple automation between apps
  - Describe automation goal clearly
  - Define starting trigger
  - List apps and step-by-step actions
  - Add filters and conditions
  
- **n8n Workflow Builder**: Self-hosted automation with LLM integration
  - Multiple trigger types (webhook, schedule, chat, email, file, database)
  - Complex data processing workflows
  - Optional AI/LLM integration for intelligent processing
  - Flexible output destinations
  
- **Pipedream Conversational Flow**: Serverless event-driven workflows
  - HTTP, schedule, email, webhook, and SSE triggers
  - Multi-API integrations
  - Optional conversation context memory
  - Multiple response formats (email, JSON, Slack, SMS, Discord)
  
- **LangChain Conversational Agent**: AI agents with tools and memory
  - Define agent purpose and personality
  - Specify available tools (search, create tickets, check status)
  - Configure knowledge sources (RAG/vector stores)
  - Memory configuration (buffer, summary, window)
  - Safety constraints and guardrails
  
- **CrewAI Multi-Agent Workflow**: Coordinated multi-agent systems
  - Define crew mission and agent roles
  - Task assignment and distribution logic
  - Inter-agent communication patterns
  - Multiple input triggers (chat, email, form, API, schedule)
  - Success criteria and output delivery
  
- **AutoGen Conversable Agent**: Collaborative code generation agents
  - Define agent scenario and goals
  - Configure conversable agents (coder, reviewer, user proxy)
  - Human-in-the-loop settings (always, approval, errors, never)
  - Iteration and refinement process
  - Code generation with validation
  - Termination conditions

These frameworks enable natural language workflow creation by:
1. Breaking down complex automation into conversational inputs
2. Supporting multi-turn context where relevant
3. Providing structured templates for platform-specific requirements
4. Enabling both simple and complex orchestration patterns

#### Text Generation - 25 Frameworks
- **COSTAR**: Context, Objective, Style, Tone, Audience, Response
- **APE**: Action, Purpose, Expectation (beginner-friendly)
- **RACE**: Role, Action, Context, Expectation
- **CRISPE**: Context, Role, Input, Steps, Parameters, Example
- **ROSES**: Role, Objective, Style, Example, Scenario
- **TRACE**: Task, Requirements, Audience, Context, Evaluation
- **ROLE**: Role, Objectives, Limitations, Evaluation
- **Chain of Thought (CoT)**: Step-by-step reasoning
- **Few-Shot Learning**: Learning from examples
- **ReAct**: Reason + Act for interactive agents
- **Zero-Shot**: Direct, simple instructions
- **Self-Consistency**: Multiple reasoning paths
- **Tree of Thoughts**: Branching exploration
- **Persona Pattern**: Role-playing specific characters
- **Question Refinement**: Improving question quality
- **Template Pattern**: Structured output templates
- **Flipped Interaction**: AI asks questions
- **Cognitive Verifier**: Question decomposition
- **Audience Persona**: Tailored explanations
- **Fact Check List**: Verification and accuracy
- **Reflection**: Meta-cognitive improvement
- **Semantic Filter**: Content filtering and constraints
- **RTF**: Role-Task-Format (simple structure)
- **Constitutional AI**: Ethics and safety principles
- **Iterative Refinement**: Progressive improvement
- **Socratic Method**: Discovery through questioning

### Sora 2 Video Prompting Best Practices

The Sora frameworks implement official OpenAI guidelines:

1. **Be Specific**: Replace vague descriptions with concrete visual details
2. **Camera Grammar**: Specify framing, lens, movement, and focus
3. **Lighting & Color**: Define key light, fill, palette, and atmosphere
4. **One Move, One Action**: Keep camera and subject actions simple
5. **Timing in Beats**: Describe actions in specific counts or seconds
6. **Dialogue**: Write short, natural lines that fit clip length
7. **Style First**: Establish visual aesthetic early (e.g., "1970s film noir")
8. **Cameo Usage**: Up to 2 cameos per video (personal or character)
9. **Resolution Matters**: Higher resolution = better fidelity and consistency
10. **Iterate with Remix**: Make one targeted change at a time

### Organizing Prompts

- **Categories**: All, Favorites, Video (Sora), Automation, Frameworks, Custom, Recent
- **Search**: Real-time search across names, content, and tags
- **Tags**: Multi-select filtering with AND logic
- **Sort**: By name, creation date, or update date

### Version Control

Every prompt edit creates a new version with:
- Automatic version numbering
- Optional change description
- Full revision history (last 10 versions)
- One-click restore to previous versions

### Sharing & Export

- **Share**: Generate shareable URL with encoded prompt
- **Export**: Single prompts in JSON, YAML, or Markdown
- **Bulk Export**: All prompts as ZIP file
- **Import**: Single or multiple prompts with validation

## Architecture

### Storage Layer

The app uses an abstract storage adapter pattern:

\`\`\`typescript
interface StorageAdapter {
  getPrompts(): Promise<Prompt[]>
  savePrompt(prompt: Prompt, changeDescription?: string): Promise<Prompt>
  getPromptRevisions(id: string): Promise<PromptRevision[]>
  restoreRevision(promptId: string, revisionId: string): Promise<Prompt>
  bulkExport(): Promise<Prompt[]>
  bulkImport(prompts: Prompt[]): Promise<void>
  duplicatePrompt(id: string): Promise<Prompt>
  // ... other methods
}
\`\`\`

This allows easy migration to databases like:
- Supabase
- Neon Postgres
- Other SQL/NoSQL databases

### Data Model

\`\`\`typescript
interface Prompt {
  id: string
  name: string
  template: string
  variables: Variable[]
  tags: string[]
  category?: string // "video" for Sora, "automation" for workflows, "frameworks" for text
  isFavorite?: boolean
  isFramework?: boolean
  version?: number
  revisions?: PromptRevision[]
  createdAt: Date
  updatedAt: Date
}

interface Variable {
  id: string
  name: string
  type: VariableType
  options?: VariableOption[]
  defaultValue?: any
  min?: number
  max?: number
  step?: number
  placeholder?: string
}

interface PromptRevision {
  id: string
  version: number
  name: string
  template: string
  variables: Variable[]
  tags: string[]
  timestamp: Date
  changeDescription?: string
}
\`\`\`

### Data Flow

1. User interaction → Component state
2. Debounced updates (300ms for search)
3. Validation via Zod schemas
4. Storage adapter (LocalStorage/DB)
5. Optimistic UI updates
6. Toast notifications for feedback

### Error Handling

- Error boundaries wrap entire app
- Zod validation on all inputs
- Try-catch blocks in all async operations
- User-friendly error messages
- Detailed error logging for debugging

## File Structure

\`\`\`
├── app/
│   ├── page.tsx              # Home page with prompt library
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
│   ├── prompt-card.tsx
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
│   ├── sora-frameworks.ts    # 10 Sora 2 video frameworks
│   ├── automation-frameworks.ts # 7 Automation & Workflow frameworks
│   └── seed-frameworks.ts    # Framework seeding logic
└── hooks/
    ├── use-debounce.ts
    ├── use-revision-history.ts
    └── use-prompt-export.ts
\`\`\`

## Sora 2 Integration

The app includes comprehensive Sora 2 video generation frameworks based on OpenAI's official documentation and best practices. All frameworks support:

- Professional cinematography terms and structures
- Camera setup (framing, lens, movement)
- Lighting design and color grading
- Character and scene descriptions
- Dialogue and sound design
- Cameo integration (personal and character)
- Technical specifications (resolution, duration, format)

For Sora API integration, the frameworks are designed to work with:
- \`model\`: "sora-2" or "sora-2-pro"
- \`size\`: Resolution strings (e.g., "1280x720", "720x1280")
- \`seconds\`: Duration ("4", "8", "12")

## Future Enhancements

### Phase 3: AI Integration & Testing (Planned)
- Direct AI provider integration (OpenAI, Anthropic, Groq, xAI)
- Sora API integration for video generation
- In-app prompt execution
- Response history and comparison
- A/B testing for prompt variations
- Quality scoring and suggestions
- Token usage tracking

### Phase 4: Production Polish (Planned)
- Comprehensive accessibility audit (WCAG compliance)
- Performance optimization (virtual scrolling)
- E2E tests with Playwright
- CI/CD pipeline
- Onboarding tour for new users
- In-app help documentation

## Contributing

This is a production-grade application following best practices:
- TypeScript strict mode
- Zod validation for runtime safety
- Comprehensive error handling
- Accessible UI (keyboard navigation, ARIA labels)
- Mobile-responsive design
- Clean, maintainable code

## License

MIT
