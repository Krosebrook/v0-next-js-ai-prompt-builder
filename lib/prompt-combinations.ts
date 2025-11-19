import type { Prompt, Variable } from "./types"
import { nanoid } from "nanoid"

/**
 * Tag combination rules for generating meta-prompts
 * Each rule defines which tag combinations should trigger dynamic prompt generation
 */
export interface CombinationRule {
  tags: string[]
  matcher: (selectedTags: string[]) => boolean
  generator: (selectedTags: string[]) => Prompt
  priority: number // Higher priority rules are checked first
}

/**
 * Generate a meta-prompt ID based on tag combination
 */
function generateCombinationId(tags: string[]): string {
  return `combo-${tags.sort().join("-")}-${nanoid(6)}`
}

/**
 * Check if selected tags match automation platform patterns
 */
function isAutomationPlatform(tag: string): boolean {
  return ["make.com", "zapier", "n8n", "pipedream"].includes(tag.toLowerCase())
}

/**
 * Check if selected tags match AI agent patterns
 */
function isAIAgent(tag: string): boolean {
  return ["ai-agent", "langchain", "crewai", "autogen", "multi-agent"].includes(tag.toLowerCase())
}

/**
 * Combination rules registry
 */
export const combinationRules: CombinationRule[] = [
  // Meta + Framework combination
  {
    tags: ["meta", "framework"],
    matcher: (selected) => selected.includes("meta") && selected.includes("framework"),
    generator: (selected) => ({
      id: generateCombinationId(["meta", "framework"]),
      name: "Meta-Framework Prompt Builder",
      template: `# Meta-Framework Analysis

**Context**: {context}
**Target Framework**: {target_framework}
**Complexity Level**: {complexity_level}

## Objective
Analyze and synthesize multiple prompting frameworks to create an optimal meta-framework approach for: {objective}

## Framework Components
**Primary Frameworks to Combine**: {frameworks_list}
**Integration Strategy**: {integration_strategy}

## Meta-Analysis Requirements
1. Framework Strengths Assessment: {strengths}
2. Synergy Opportunities: {synergies}
3. Conflict Resolution: {conflicts}

## Output Structure
**Desired Format**: {output_format}
**Success Criteria**: {success_criteria}

Generate a comprehensive meta-framework that leverages the best elements of the selected frameworks while addressing their limitations.`,
      variables: [
        { id: nanoid(), name: "context", type: "textarea", placeholder: "Describe the use case context..." },
        { id: nanoid(), name: "target_framework", type: "select", options: [
          { value: "costar", label: "COSTAR" },
          { value: "ape", label: "APE" },
          { value: "race", label: "RACE" },
          { value: "custom", label: "Custom" }
        ]},
        { id: nanoid(), name: "complexity_level", type: "select", options: [
          { value: "simple", label: "Simple" },
          { value: "moderate", label: "Moderate" },
          { value: "complex", label: "Complex" }
        ]},
        { id: nanoid(), name: "objective", type: "text", placeholder: "What do you want to achieve?" },
        { id: nanoid(), name: "frameworks_list", type: "textarea", placeholder: "List frameworks to combine (e.g., COSTAR, Chain of Thought, Few-Shot)" },
        { id: nanoid(), name: "integration_strategy", type: "textarea", placeholder: "How should these frameworks work together?" },
        { id: nanoid(), name: "strengths", type: "textarea", placeholder: "Key strengths of each framework" },
        { id: nanoid(), name: "synergies", type: "textarea", placeholder: "How frameworks complement each other" },
        { id: nanoid(), name: "conflicts", type: "textarea", placeholder: "Potential conflicts and resolutions" },
        { id: nanoid(), name: "output_format", type: "text", placeholder: "JSON, Markdown, Structured text..." },
        { id: nanoid(), name: "success_criteria", type: "textarea", placeholder: "How to measure success" }
      ],
      tags: ["meta", "framework", "combination", "advanced", "analytical"],
      category: "text",
      isFramework: false,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }),
    priority: 100
  },

  // Zapier + AI Agent combination
  {
    tags: ["zapier", "ai-agent"],
    matcher: (selected) => selected.includes("zapier") && isAIAgent(selected.join(",")),
    generator: (selected) => ({
      id: generateCombinationId(["zapier", "ai-agent"]),
      name: "Zapier AI Agent Builder",
      template: `# Zapier AI Agent Configuration

**Agent Name**: {agent_name}
**Primary Function**: {primary_function}
**Trigger Type**: {trigger_type}

## Agent Personality & Behavior
**Role**: {agent_role}
**Tone**: {agent_tone}
**Decision-Making Approach**: {decision_approach}

## Zapier Workflow Integration
**Trigger Event**: {trigger_event}
**Data Inputs**: {data_inputs}
**Expected Actions**: {expected_actions}

## AI Processing Logic
**Analysis Requirements**: {analysis_requirements}
**Decision Criteria**: {decision_criteria}
**Conditional Logic**: {conditional_logic}

## Output Actions
**Zapier Actions to Execute**: {zapier_actions}
**Notification Settings**: {notifications}
**Error Handling**: {error_handling}

## Success Metrics
**KPIs**: {kpis}
**Monitoring Requirements**: {monitoring}

Create a detailed Zapier Zap configuration that integrates an AI agent to: {integration_goal}`,
      variables: [
        { id: nanoid(), name: "agent_name", type: "text", placeholder: "Customer Support AI Agent" },
        { id: nanoid(), name: "primary_function", type: "text", placeholder: "Automate customer inquiry routing" },
        { id: nanoid(), name: "trigger_type", type: "select", options: [
          { value: "webhook", label: "Webhook" },
          { value: "email", label: "Email Received" },
          { value: "form", label: "Form Submission" },
          { value: "schedule", label: "Schedule" }
        ]},
        { id: nanoid(), name: "agent_role", type: "text", placeholder: "Customer service specialist" },
        { id: nanoid(), name: "agent_tone", type: "select", options: [
          { value: "professional", label: "Professional" },
          { value: "friendly", label: "Friendly" },
          { value: "technical", label: "Technical" },
          { value: "empathetic", label: "Empathetic" }
        ]},
        { id: nanoid(), name: "decision_approach", type: "textarea", placeholder: "Rule-based with ML confidence scoring" },
        { id: nanoid(), name: "trigger_event", type: "text", placeholder: "New email received in support inbox" },
        { id: nanoid(), name: "data_inputs", type: "textarea", placeholder: "Email subject, body, sender info, attachments" },
        { id: nanoid(), name: "expected_actions", type: "textarea", placeholder: "Classify, route, auto-respond, escalate" },
        { id: nanoid(), name: "analysis_requirements", type: "textarea", placeholder: "Sentiment analysis, intent classification, urgency detection" },
        { id: nanoid(), name: "decision_criteria", type: "textarea", placeholder: "Urgency score >8: escalate immediately" },
        { id: nanoid(), name: "conditional_logic", type: "textarea", placeholder: "IF urgent THEN notify Slack AND create ticket" },
        { id: nanoid(), name: "zapier_actions", type: "textarea", placeholder: "1. Create Zendesk ticket\n2. Send Slack notification\n3. Log to Airtable" },
        { id: nanoid(), name: "notifications", type: "textarea", placeholder: "Slack for urgent, Email digest for routine" },
        { id: nanoid(), name: "error_handling", type: "textarea", placeholder: "Retry 3x, then fallback to human review queue" },
        { id: nanoid(), name: "kpis", type: "textarea", placeholder: "Response time, accuracy rate, escalation rate" },
        { id: nanoid(), name: "monitoring", type: "textarea", placeholder: "Daily metrics dashboard, weekly performance reports" },
        { id: nanoid(), name: "integration_goal", type: "text", placeholder: "Reduce response time by 80%" }
      ],
      tags: ["zapier", "ai-agent", "automation", "workflow", "combination", "integration"],
      category: "automation",
      isFramework: false,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }),
    priority: 90
  },

  // Make.com + Any Prompt Type
  {
    tags: ["make.com"],
    matcher: (selected) => selected.includes("make.com") && selected.length > 1,
    generator: (selected) => {
      const otherTags = selected.filter(t => t !== "make.com")
      return {
        id: generateCombinationId(["make.com", ...otherTags]),
        name: `Make.com Scenario: ${otherTags.join(" + ")}`,
        template: `# Make.com Scenario Builder

**Scenario Name**: {scenario_name}
**Purpose**: Build a Make.com scenario that implements {prompt_type} automation

## Input Configuration
**Trigger Module**: {trigger_module}
**Trigger Settings**: {trigger_settings}
**Input Data Structure**: {input_structure}

## AI Processing Module
**AI Provider**: {ai_provider}
**Model**: {ai_model}
**Prompt Template**: {prompt_template}
**Temperature**: {temperature}
**Max Tokens**: {max_tokens}

## Data Transformation
**Router Logic**: {router_logic}
**Data Mapping**: {data_mapping}
**Filters**: {filters}

## Output Modules
**Primary Action**: {primary_action}
**Secondary Actions**: {secondary_actions}
**Error Handling Module**: {error_handling}

## Scenario Flow
{flow_description}

## Variables & Data Stores
**Scenario Variables**: {scenario_variables}
**Data Store Usage**: {data_store}

## Testing & Validation
**Test Cases**: {test_cases}
**Expected Outputs**: {expected_outputs}

Generate a complete Make.com scenario JSON blueprint for: {scenario_goal}`,
        variables: [
          { id: nanoid(), name: "scenario_name", type: "text", placeholder: "AI Content Processor" },
          { id: nanoid(), name: "prompt_type", type: "text", defaultValue: otherTags.join(", "), placeholder: "Type of prompt to automate" },
          { id: nanoid(), name: "trigger_module", type: "select", options: [
            { value: "webhook", label: "Webhook" },
            { value: "http", label: "HTTP Request" },
            { value: "schedule", label: "Schedule" },
            { value: "google-sheets", label: "Google Sheets" },
            { value: "airtable", label: "Airtable" }
          ]},
          { id: nanoid(), name: "trigger_settings", type: "textarea", placeholder: "Webhook URL, schedule cron, etc." },
          { id: nanoid(), name: "input_structure", type: "textarea", placeholder: "JSON structure of expected input data" },
          { id: nanoid(), name: "ai_provider", type: "select", options: [
            { value: "openai", label: "OpenAI" },
            { value: "anthropic", label: "Anthropic Claude" },
            { value: "google", label: "Google AI" },
            { value: "custom", label: "Custom API" }
          ]},
          { id: nanoid(), name: "ai_model", type: "text", placeholder: "gpt-4, claude-3-opus, etc." },
          { id: nanoid(), name: "prompt_template", type: "textarea", placeholder: "Your AI prompt with {{variables}}" },
          { id: nanoid(), name: "temperature", type: "slider", min: 0, max: 2, step: 0.1, defaultValue: 0.7 },
          { id: nanoid(), name: "max_tokens", type: "number", defaultValue: 1000 },
          { id: nanoid(), name: "router_logic", type: "textarea", placeholder: "Route based on AI response type or content" },
          { id: nanoid(), name: "data_mapping", type: "textarea", placeholder: "Map AI output fields to destination fields" },
          { id: nanoid(), name: "filters", type: "textarea", placeholder: "Conditional filters to apply" },
          { id: nanoid(), name: "primary_action", type: "text", placeholder: "Send to Slack, Create Notion page, etc." },
          { id: nanoid(), name: "secondary_actions", type: "textarea", placeholder: "Additional actions to perform" },
          { id: nanoid(), name: "error_handling", type: "textarea", placeholder: "Retry logic, fallback actions, notifications" },
          { id: nanoid(), name: "flow_description", type: "textarea", placeholder: "Describe the complete scenario flow" },
          { id: nanoid(), name: "scenario_variables", type: "textarea", placeholder: "List scenario-level variables" },
          { id: nanoid(), name: "data_store", type: "textarea", placeholder: "Data store tables and usage" },
          { id: nanoid(), name: "test_cases", type: "textarea", placeholder: "Test scenarios to validate" },
          { id: nanoid(), name: "expected_outputs", type: "textarea", placeholder: "Expected results for each test" },
          { id: nanoid(), name: "scenario_goal", type: "text", placeholder: "What this scenario should accomplish" }
        ],
        tags: ["make.com", "scenario", "automation", "combination", ...otherTags],
        category: "automation",
        isFramework: false,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    priority: 80
  },

  // n8n + Any Prompt Type
  {
    tags: ["n8n"],
    matcher: (selected) => selected.includes("n8n") && selected.length > 1,
    generator: (selected) => {
      const otherTags = selected.filter(t => t !== "n8n")
      return {
        id: generateCombinationId(["n8n", ...otherTags]),
        name: `n8n Workflow: ${otherTags.join(" + ")}`,
        template: `# n8n Workflow Builder

**Workflow Name**: {workflow_name}
**Purpose**: Create an n8n workflow that implements {prompt_type} automation

## Trigger Node
**Node Type**: {trigger_type}
**Configuration**: {trigger_config}

## AI Node Configuration
**AI Service**: {ai_service}
**System Message**: {system_message}
**User Prompt Template**: 
\`\`\`
{user_prompt}
\`\`\`

**Parameters**:
- Model: {model}
- Temperature: {temperature}
- Max Tokens: {max_tokens}
- Top P: {top_p}

## Data Processing Nodes
**Code Node Logic**: {code_logic}
**Function Node**: {function_node}
**Set Node Mappings**: {set_mappings}

## Conditional Logic
**IF Node Conditions**: {if_conditions}
**Switch Node Cases**: {switch_cases}

## Output Nodes
**Primary Destination**: {primary_destination}
**Success Actions**: {success_actions}
**Failure Actions**: {failure_actions}

## Workflow Credentials
**Required Credentials**: {credentials}
**Environment Variables**: {env_vars}

## Execution Settings
**Timeout**: {timeout}
**Retry on Fail**: {retry_enabled}
**Max Attempts**: {max_attempts}
**Wait Between Retries**: {retry_wait}

## Workflow JSON Structure
Generate the complete n8n workflow JSON for: {workflow_goal}`,
        variables: [
          { id: nanoid(), name: "workflow_name", type: "text", placeholder: "AI Content Analyzer" },
          { id: nanoid(), name: "prompt_type", type: "text", defaultValue: otherTags.join(", ") },
          { id: nanoid(), name: "trigger_type", type: "select", options: [
            { value: "webhook", label: "Webhook" },
            { value: "schedule", label: "Schedule Trigger" },
            { value: "manual", label: "Manual Trigger" },
            { value: "email", label: "Email Trigger" }
          ]},
          { id: nanoid(), name: "trigger_config", type: "textarea", placeholder: "Trigger configuration details" },
          { id: nanoid(), name: "ai_service", type: "select", options: [
            { value: "openai", label: "OpenAI" },
            { value: "anthropic", label: "Anthropic" },
            { value: "langchain", label: "LangChain" },
            { value: "ollama", label: "Ollama (Self-hosted)" }
          ]},
          { id: nanoid(), name: "system_message", type: "textarea", placeholder: "System instructions for the AI" },
          { id: nanoid(), name: "user_prompt", type: "textarea", placeholder: "User prompt with {{$json.variables}}" },
          { id: nanoid(), name: "model", type: "text", placeholder: "gpt-4-turbo, claude-3-opus" },
          { id: nanoid(), name: "temperature", type: "slider", min: 0, max: 2, step: 0.1, defaultValue: 0.7 },
          { id: nanoid(), name: "max_tokens", type: "number", defaultValue: 2000 },
          { id: nanoid(), name: "top_p", type: "slider", min: 0, max: 1, step: 0.1, defaultValue: 1 },
          { id: nanoid(), name: "code_logic", type: "textarea", placeholder: "JavaScript code for processing" },
          { id: nanoid(), name: "function_node", type: "textarea", placeholder: "Function node transformations" },
          { id: nanoid(), name: "set_mappings", type: "textarea", placeholder: "Field mappings and transformations" },
          { id: nanoid(), name: "if_conditions", type: "textarea", placeholder: "Conditional branching logic" },
          { id: nanoid(), name: "switch_cases", type: "textarea", placeholder: "Switch node routing rules" },
          { id: nanoid(), name: "primary_destination", type: "text", placeholder: "Slack, Discord, Database, etc." },
          { id: nanoid(), name: "success_actions", type: "textarea", placeholder: "Actions on successful execution" },
          { id: nanoid(), name: "failure_actions", type: "textarea", placeholder: "Actions on failure" },
          { id: nanoid(), name: "credentials", type: "textarea", placeholder: "List required API credentials" },
          { id: nanoid(), name: "env_vars", type: "textarea", placeholder: "Environment variables needed" },
          { id: nanoid(), name: "timeout", type: "number", defaultValue: 300 },
          { id: nanoid(), name: "retry_enabled", type: "switch", defaultValue: true },
          { id: nanoid(), name: "max_attempts", type: "number", defaultValue: 3 },
          { id: nanoid(), name: "retry_wait", type: "number", defaultValue: 1000 },
          { id: nanoid(), name: "workflow_goal", type: "text", placeholder: "Describe the workflow objective" }
        ],
        tags: ["n8n", "workflow", "automation", "self-hosted", "combination", ...otherTags],
        category: "automation",
        isFramework: false,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    priority: 80
  },

  // Sora + Any descriptive tag
  {
    tags: ["sora"],
    matcher: (selected) => selected.includes("sora") && selected.length > 1,
    generator: (selected) => {
      const otherTags = selected.filter(t => t !== "sora")
      const hasCamera = selected.some(t => t.includes("camera"))
      const hasCharacter = selected.some(t => t.includes("character") || t.includes("cameo"))
      
      return {
        id: generateCombinationId(["sora", ...otherTags]),
        name: `Sora Video: ${otherTags.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(" ")}`,
        template: `# Sora Video Generation - ${otherTags.join(" + ")}

## Scene Setup
**Environment**: {environment}
**Time of Day**: {time_of_day}
**Weather/Atmosphere**: {atmosphere}

${hasCharacter ? `## Character Configuration
**Character Type**: {character_type}
**Character Details**: {character_details}
**Cameo ID (if applicable)**: {cameo_id}
` : ''}

## Subject & Action
**Primary Subject**: {subject}
**Action Description**: {action}
**Secondary Elements**: {secondary_elements}

${hasCamera ? `## Camera Configuration
**Camera Type**: {camera_type}
**Lens**: {lens}
**Angle**: {angle}
**Movement**: {movement}
**Framing**: {framing}
**Depth of Field**: {dof}
` : ''}

## Visual Style
**Lighting**: {lighting}
**Color Palette**: {color_palette}
**Mood**: {mood}
**Art Style**: {art_style}

## Technical Parameters
**Duration**: {duration}
**Quality**: {quality}
**Aspect Ratio**: {aspect_ratio}

## Audio Intent
**Sound Design**: {audio_intent}

## Complete Prompt
Generate a production-ready Sora prompt that combines: {combination_goal}`,
        variables: [
          { id: nanoid(), name: "environment", type: "text", placeholder: "Urban street, forest clearing, studio..." },
          { id: nanoid(), name: "time_of_day", type: "select", options: [
            { value: "dawn", label: "Dawn" },
            { value: "morning", label: "Morning" },
            { value: "midday", label: "Midday" },
            { value: "golden-hour", label: "Golden Hour" },
            { value: "dusk", label: "Dusk" },
            { value: "night", label: "Night" }
          ]},
          { id: nanoid(), name: "atmosphere", type: "text", placeholder: "Foggy, clear, rainy, dramatic..." },
          ...(hasCharacter ? [
            { id: nanoid(), name: "character_type", type: "select", options: [
              { value: "human-cameo", label: "Human Cameo" },
              { value: "pet", label: "Pet" },
              { value: "animated", label: "Animated Character" },
              { value: "object", label: "Object Character" }
            ]},
            { id: nanoid(), name: "character_details", type: "textarea", placeholder: "Physical description, clothing, expression..." },
            { id: nanoid(), name: "cameo_id", type: "text", placeholder: "@username or character ID" }
          ] : []),
          { id: nanoid(), name: "subject", type: "text", placeholder: "Main focus of the scene" },
          { id: nanoid(), name: "action", type: "textarea", placeholder: "What's happening in detail" },
          { id: nanoid(), name: "secondary_elements", type: "textarea", placeholder: "Background action, environmental details" },
          ...(hasCamera ? [
            { id: nanoid(), name: "camera_type", type: "select", options: [
              { value: "cinema", label: "Cinema Camera" },
              { value: "smartphone", label: "Smartphone" },
              { value: "drone", label: "Drone" },
              { value: "gopro", label: "Action Camera" }
            ]},
            { id: nanoid(), name: "lens", type: "text", placeholder: "24mm, 50mm, 85mm, telephoto..." },
            { id: nanoid(), name: "angle", type: "text", placeholder: "Eye level, low angle, bird's eye..." },
            { id: nanoid(), name: "movement", type: "text", placeholder: "Tracking, dolly, static, handheld..." },
            { id: nanoid(), name: "framing", type: "text", placeholder: "Close-up, medium, wide, extreme wide..." },
            { id: nanoid(), name: "dof", type: "select", options: [
              { value: "shallow", label: "Shallow (blurred bg)" },
              { value: "deep", label: "Deep (all in focus)" },
              { value: "rack-focus", label: "Rack Focus" }
            ]}
          ] : []),
          { id: nanoid(), name: "lighting", type: "text", placeholder: "Natural, studio, dramatic, soft..." },
          { id: nanoid(), name: "color_palette", type: "text", placeholder: "Warm, cool, monochrome, vibrant..." },
          { id: nanoid(), name: "mood", type: "text", placeholder: "Energetic, calm, tense, playful..." },
          { id: nanoid(), name: "art_style", type: "text", placeholder: "Cinematic, documentary, animated..." },
          { id: nanoid(), name: "duration", type: "select", options: [
            { value: "short", label: "Short (1-3s)" },
            { value: "medium", label: "Medium (3-5s)" },
            { value: "long", label: "Long (5-10s)" }
          ]},
          { id: nanoid(), name: "quality", type: "select", options: [
            { value: "standard", label: "Standard" },
            { value: "high", label: "High Quality" },
            { value: "ultra", label: "Ultra HD" }
          ]},
          { id: nanoid(), name: "aspect_ratio", type: "select", options: [
            { value: "16:9", label: "16:9 (Widescreen)" },
            { value: "9:16", label: "9:16 (Vertical)" },
            { value: "1:1", label: "1:1 (Square)" },
            { value: "21:9", label: "21:9 (Cinematic)" }
          ]},
          { id: nanoid(), name: "audio_intent", type: "textarea", placeholder: "Background music style, sound effects..." },
          { id: nanoid(), name: "combination_goal", type: "text", defaultValue: otherTags.join(" + "), placeholder: "What this video should achieve" }
        ],
        tags: ["sora", "video-generation", "combination", ...otherTags],
        category: "video",
        isFramework: false,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    priority: 75
  }
]

/**
 * Generate combination prompts based on selected tags
 */
export function generateCombinationPrompts(selectedTags: string[]): Prompt[] {
  if (selectedTags.length < 2) return []

  const combinations: Prompt[] = []
  const normalizedTags = selectedTags.map(t => t.toLowerCase())

  // Sort rules by priority (highest first)
  const sortedRules = [...combinationRules].sort((a, b) => b.priority - a.priority)

  for (const rule of sortedRules) {
    if (rule.matcher(normalizedTags)) {
      combinations.push(rule.generator(selectedTags))
    }
  }

  return combinations
}

/**
 * Check if a prompt is a combination-generated prompt
 */
export function isCombinationPrompt(promptId: string): boolean {
  return promptId.startsWith("combo-")
}
