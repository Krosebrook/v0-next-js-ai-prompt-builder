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
  },

  // Pipedream + AI techniques
  {
    tags: ["pipedream", "ai-agent"],
    matcher: (selected) => selected.includes("pipedream") && (isAIAgent(selected.join(",")) || selected.some(t => ["reasoning", "chain-of-thought", "few-shot"].includes(t))),
    generator: (selected) => ({
      id: generateCombinationId(["pipedream", ...selected.filter(t => t !== "pipedream")]),
      name: `Pipedream Workflow: AI Integration`,
      template: `# Pipedream AI Workflow

**Workflow Name**: {workflow_name}
**AI Integration Type**: {ai_type}

## Trigger Configuration
**Trigger Source**: {trigger_source}
**Event Type**: {event_type}

## AI Processing Step
**AI Provider**: {ai_provider}
**Prompt Strategy**: ${selected.includes("chain-of-thought") ? "Chain of Thought Reasoning" : selected.includes("few-shot") ? "Few-Shot Learning" : "Direct Processing"}
**Prompt Template**:
\`\`\`
{prompt_template}
\`\`\`

## Data Flow
**Input Transformation**: {input_transform}
**AI Parameters**: {ai_parameters}
**Output Mapping**: {output_mapping}

## Actions & Destinations
**Primary Action**: {primary_action}
**Secondary Actions**: {secondary_actions}
**Error Handling**: {error_handling}

## Serverless Advantages
**Cold Start Optimization**: {cold_start}
**Scaling Strategy**: {scaling}
**Cost Optimization**: {cost_optimization}

Generate a complete Pipedream workflow for: {workflow_goal}`,
      variables: [
        { id: nanoid(), name: "workflow_name", type: "text", placeholder: "AI Content Processor" },
        { id: nanoid(), name: "ai_type", type: "select", options: [
          { value: "openai", label: "OpenAI" },
          { value: "anthropic", label: "Anthropic" },
          { value: "replicate", label: "Replicate AI" },
          { value: "huggingface", label: "Hugging Face" }
        ]},
        { id: nanoid(), name: "trigger_source", type: "text", placeholder: "HTTP endpoint, Schedule, Webhook..." },
        { id: nanoid(), name: "event_type", type: "text", placeholder: "New data, scheduled run, user action..." },
        { id: nanoid(), name: "ai_provider", type: "text", placeholder: "OpenAI GPT-4, Claude 3, etc." },
        { id: nanoid(), name: "prompt_template", type: "textarea", placeholder: "Your AI prompt with {{variables}}" },
        { id: nanoid(), name: "input_transform", type: "textarea", placeholder: "Transform input data for AI" },
        { id: nanoid(), name: "ai_parameters", type: "textarea", placeholder: "temperature, max_tokens, etc." },
        { id: nanoid(), name: "output_mapping", type: "textarea", placeholder: "Map AI response to workflow data" },
        { id: nanoid(), name: "primary_action", type: "text", placeholder: "Send to database, API, notification..." },
        { id: nanoid(), name: "secondary_actions", type: "textarea", placeholder: "Additional steps to execute" },
        { id: nanoid(), name: "error_handling", type: "textarea", placeholder: "Retry logic, fallbacks, alerts" },
        { id: nanoid(), name: "cold_start", type: "textarea", placeholder: "Optimization strategies" },
        { id: nanoid(), name: "scaling", type: "textarea", placeholder: "How to handle increased load" },
        { id: nanoid(), name: "cost_optimization", type: "textarea", placeholder: "Cost reduction strategies" },
        { id: nanoid(), name: "workflow_goal", type: "text", placeholder: "What this workflow achieves" }
      ],
      tags: ["pipedream", "serverless", "ai-agent", "automation", "combination", ...selected],
      category: "automation",
      isFramework: false,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }),
    priority: 85
  },

  // LangChain + Any automation platform
  {
    tags: ["langchain"],
    matcher: (selected) => selected.includes("langchain") && isAutomationPlatform(selected.join(",")),
    generator: (selected) => {
      const platform = selected.find(t => isAutomationPlatform(t)) || "automation"
      return {
        id: generateCombinationId(["langchain", platform]),
        name: `LangChain → ${platform.toUpperCase()} Integration`,
        template: `# LangChain ${platform.toUpperCase()} Integration

**Integration Name**: {integration_name}
**LangChain Agent Type**: {agent_type}

## LangChain Configuration
**Chain Type**: {chain_type}
**Memory Type**: {memory_type}
**Tools**: {tools}

## Agent Architecture
**System Prompt**:
\`\`\`
{system_prompt}
\`\`\`

**Tool Definitions**:
{tool_definitions}

**Chain Configuration**:
{chain_config}

## ${platform.toUpperCase()} Integration
**Trigger Method**: {trigger_method}
**Data Ingestion**: {data_ingestion}
**LangChain Invocation**: {langchain_invocation}

## Output Handling
**Response Processing**: {response_processing}
**Action Routing**: {action_routing}
**State Management**: {state_management}

## Advanced Features
**Retrieval Augmented Generation (RAG)**: {rag_setup}
**Vector Store**: {vector_store}
**Document Loaders**: {document_loaders}

## Deployment
**Hosting**: {hosting}
**API Endpoints**: {api_endpoints}
**Authentication**: {authentication}

Create a production-ready LangChain integration for: {integration_goal}`,
        variables: [
          { id: nanoid(), name: "integration_name", type: "text", placeholder: "Intelligent Customer Support Agent" },
          { id: nanoid(), name: "agent_type", type: "select", options: [
            { value: "conversational", label: "Conversational Agent" },
            { value: "react", label: "ReAct Agent" },
            { value: "structured", label: "Structured Chat Agent" },
            { value: "openai-functions", label: "OpenAI Functions Agent" }
          ]},
          { id: nanoid(), name: "chain_type", type: "select", options: [
            { value: "llmchain", label: "LLM Chain" },
            { value: "sequential", label: "Sequential Chain" },
            { value: "router", label: "Router Chain" },
            { value: "custom", label: "Custom Chain" }
          ]},
          { id: nanoid(), name: "memory_type", type: "select", options: [
            { value: "buffer", label: "Buffer Memory" },
            { value: "window", label: "Window Memory" },
            { value: "summary", label: "Summary Memory" },
            { value: "entity", label: "Entity Memory" }
          ]},
          { id: nanoid(), name: "tools", type: "textarea", placeholder: "List available tools (search, calculator, API calls, etc.)" },
          { id: nanoid(), name: "system_prompt", type: "textarea", placeholder: "System instructions for the agent" },
          { id: nanoid(), name: "tool_definitions", type: "textarea", placeholder: "Define each tool's purpose and parameters" },
          { id: nanoid(), name: "chain_config", type: "textarea", placeholder: "Chain-specific configuration options" },
          { id: nanoid(), name: "trigger_method", type: "text", placeholder: `How ${platform} triggers LangChain` },
          { id: nanoid(), name: "data_ingestion", type: "textarea", placeholder: `How data flows from ${platform} to LangChain` },
          { id: nanoid(), name: "langchain_invocation", type: "textarea", placeholder: "API calls and invocation logic" },
          { id: nanoid(), name: "response_processing", type: "textarea", placeholder: "How LangChain responses are processed" },
          { id: nanoid(), name: "action_routing", type: "textarea", placeholder: `How responses route back to ${platform} actions` },
          { id: nanoid(), name: "state_management", type: "textarea", placeholder: "Conversation state and context management" },
          { id: nanoid(), name: "rag_setup", type: "textarea", placeholder: "RAG configuration if using document retrieval" },
          { id: nanoid(), name: "vector_store", type: "text", placeholder: "Pinecone, Weaviate, FAISS, etc." },
          { id: nanoid(), name: "document_loaders", type: "textarea", placeholder: "Document sources and loading strategies" },
          { id: nanoid(), name: "hosting", type: "text", placeholder: "Where LangChain is hosted (Vercel, AWS Lambda, etc.)" },
          { id: nanoid(), name: "api_endpoints", type: "textarea", placeholder: "API endpoint definitions" },
          { id: nanoid(), name: "authentication", type: "textarea", placeholder: "Auth strategy and API keys" },
          { id: nanoid(), name: "integration_goal", type: "text", placeholder: "What this integration accomplishes" }
        ],
        tags: ["langchain", platform, "ai-agent", "rag", "multi-agent", "combination", ...selected],
        category: "automation",
        isFramework: false,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    priority: 88
  },

  // CrewAI + Automation platforms
  {
    tags: ["crewai"],
    matcher: (selected) => selected.includes("crewai") && selected.length > 1,
    generator: (selected) => {
      const otherTags = selected.filter(t => t !== "crewai")
      return {
        id: generateCombinationId(["crewai", ...otherTags]),
        name: `CrewAI Multi-Agent: ${otherTags.join(" + ")}`,
        template: `# CrewAI Multi-Agent System

**Crew Name**: {crew_name}
**Mission**: {mission}
**Domain**: ${otherTags.join(", ")}

## Agent Definitions

### Agent 1: {agent1_role}
**Goal**: {agent1_goal}
**Backstory**: {agent1_backstory}
**Tools**: {agent1_tools}

### Agent 2: {agent2_role}
**Goal**: {agent2_goal}
**Backstory**: {agent2_backstory}
**Tools**: {agent2_tools}

### Agent 3 (Optional): {agent3_role}
**Goal**: {agent3_goal}
**Backstory**: {agent3_backstory}
**Tools**: {agent3_tools}

## Task Definitions

### Task 1: {task1_description}
**Assigned to**: {task1_agent}
**Expected Output**: {task1_output}
**Dependencies**: {task1_dependencies}

### Task 2: {task2_description}
**Assigned to**: {task2_agent}
**Expected Output**: {task2_output}
**Dependencies**: {task2_dependencies}

### Task 3 (Optional): {task3_description}
**Assigned to**: {task3_agent}
**Expected Output**: {task3_output}
**Dependencies**: {task3_dependencies}

## Collaboration Strategy
**Process Type**: {process_type}
**Communication Protocol**: {communication_protocol}
**Conflict Resolution**: {conflict_resolution}

## Integration & Deployment
**Trigger Mechanism**: {trigger_mechanism}
**Input Data Structure**: {input_structure}
**Output Destinations**: {output_destinations}

## Monitoring & Evaluation
**Success Metrics**: {success_metrics}
**Logging Strategy**: {logging_strategy}

Generate a complete CrewAI configuration for: {crew_goal}`,
        variables: [
          { id: nanoid(), name: "crew_name", type: "text", placeholder: "Content Creation Crew" },
          { id: nanoid(), name: "mission", type: "textarea", placeholder: "Overall mission of the crew" },
          { id: nanoid(), name: "agent1_role", type: "text", placeholder: "Research Specialist" },
          { id: nanoid(), name: "agent1_goal", type: "textarea", placeholder: "Gather comprehensive research data" },
          { id: nanoid(), name: "agent1_backstory", type: "textarea", placeholder: "Expert researcher with 10+ years experience..." },
          { id: nanoid(), name: "agent1_tools", type: "textarea", placeholder: "Web search, document reader, API access..." },
          { id: nanoid(), name: "agent2_role", type: "text", placeholder: "Content Writer" },
          { id: nanoid(), name: "agent2_goal", type: "textarea", placeholder: "Create engaging, accurate content" },
          { id: nanoid(), name: "agent2_backstory", type: "textarea", placeholder: "Professional writer specialized in..." },
          { id: nanoid(), name: "agent2_tools", type: "textarea", placeholder: "Content templates, style guides..." },
          { id: nanoid(), name: "agent3_role", type: "text", placeholder: "Editor/QA (Optional)" },
          { id: nanoid(), name: "agent3_goal", type: "textarea", placeholder: "Ensure quality and accuracy" },
          { id: nanoid(), name: "agent3_backstory", type: "textarea", placeholder: "Quality assurance expert..." },
          { id: nanoid(), name: "agent3_tools", type: "textarea", placeholder: "Fact checker, grammar tools..." },
          { id: nanoid(), name: "task1_description", type: "textarea", placeholder: "Conduct research on topic" },
          { id: nanoid(), name: "task1_agent", type: "text", placeholder: "Research Specialist" },
          { id: nanoid(), name: "task1_output", type: "textarea", placeholder: "Detailed research report with sources" },
          { id: nanoid(), name: "task1_dependencies", type: "text", placeholder: "None" },
          { id: nanoid(), name: "task2_description", type: "textarea", placeholder: "Write content based on research" },
          { id: nanoid(), name: "task2_agent", type: "text", placeholder: "Content Writer" },
          { id: nanoid(), name: "task2_output", type: "textarea", placeholder: "Draft article in markdown" },
          { id: nanoid(), name: "task2_dependencies", type: "text", placeholder: "Task 1 completion" },
          { id: nanoid(), name: "task3_description", type: "textarea", placeholder: "Review and edit content" },
          { id: nanoid(), name: "task3_agent", type: "text", placeholder: "Editor/QA" },
          { id: nanoid(), name: "task3_output", type: "textarea", placeholder: "Final polished article" },
          { id: nanoid(), name: "task3_dependencies", type: "text", placeholder: "Task 2 completion" },
          { id: nanoid(), name: "process_type", type: "select", options: [
            { value: "sequential", label: "Sequential (one after another)" },
            { value: "hierarchical", label: "Hierarchical (manager delegates)" },
            { value: "collaborative", label: "Collaborative (work together)" }
          ]},
          { id: nanoid(), name: "communication_protocol", type: "textarea", placeholder: "How agents communicate and share data" },
          { id: nanoid(), name: "conflict_resolution", type: "textarea", placeholder: "How disagreements are resolved" },
          { id: nanoid(), name: "trigger_mechanism", type: "text", placeholder: "API call, webhook, schedule..." },
          { id: nanoid(), name: "input_structure", type: "textarea", placeholder: "Expected input data format" },
          { id: nanoid(), name: "output_destinations", type: "textarea", placeholder: "Where results are sent" },
          { id: nanoid(), name: "success_metrics", type: "textarea", placeholder: "How to measure success" },
          { id: nanoid(), name: "logging_strategy", type: "textarea", placeholder: "What to log and how" },
          { id: nanoid(), name: "crew_goal", type: "text", placeholder: "Ultimate goal of this crew" }
        ],
        tags: ["crewai", "multi-agent", "collaborative", "orchestration", "combination", ...otherTags],
        category: "automation",
        isFramework: false,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    priority: 87
  },

  // AutoGen + Any scenario
  {
    tags: ["autogen"],
    matcher: (selected) => selected.includes("autogen") && selected.length > 1,
    generator: (selected) => {
      const otherTags = selected.filter(t => t !== "autogen")
      return {
        id: generateCombinationId(["autogen", ...otherTags]),
        name: `AutoGen System: ${otherTags.join(" + ")}`,
        template: `# AutoGen Multi-Agent System

**System Name**: {system_name}
**Use Case**: ${otherTags.join(", ")}

## Agent Configuration

### User Proxy Agent
**Role**: {user_proxy_role}
**Human Input Mode**: {human_input_mode}
**Code Execution**: {code_execution_config}

### Assistant Agent 1: {assistant1_name}
**System Message**: {assistant1_system}
**LLM Config**: {assistant1_llm_config}
**Functions**: {assistant1_functions}

### Assistant Agent 2 (Optional): {assistant2_name}
**System Message**: {assistant2_system}
**LLM Config**: {assistant2_llm_config}
**Functions**: {assistant2_functions}

## Conversation Flow
**Initiation**: {initiation}
**Turn-taking Strategy**: {turn_taking}
**Max Rounds**: {max_rounds}
**Termination Condition**: {termination_condition}

## Code Generation & Execution
**Allowed Languages**: {allowed_languages}
**Execution Environment**: {execution_environment}
**Safety Constraints**: {safety_constraints}

## Integration Points
**Input Source**: {input_source}
**Output Destination**: {output_destination}
**State Persistence**: {state_persistence}

## Advanced Features
**Teachability**: {teachability_config}
**RAG Integration**: {rag_integration}
**Tool Use**: {tool_use}

## Deployment
**Container Configuration**: {container_config}
**API Wrapper**: {api_wrapper}
**Monitoring**: {monitoring}

Build an AutoGen system for: {system_goal}`,
        variables: [
          { id: nanoid(), name: "system_name", type: "text", placeholder: "Code Assistant System" },
          { id: nanoid(), name: "user_proxy_role", type: "textarea", placeholder: "Acts as human user representative" },
          { id: nanoid(), name: "human_input_mode", type: "select", options: [
            { value: "ALWAYS", label: "Always Ask Human" },
            { value: "TERMINATE", label: "Ask on Termination" },
            { value: "NEVER", label: "Never Ask" }
          ]},
          { id: nanoid(), name: "code_execution_config", type: "textarea", placeholder: "Docker config, timeout, working directory..." },
          { id: nanoid(), name: "assistant1_name", type: "text", placeholder: "Code Generator" },
          { id: nanoid(), name: "assistant1_system", type: "textarea", placeholder: "System message for this assistant" },
          { id: nanoid(), name: "assistant1_llm_config", type: "textarea", placeholder: "Model, temperature, max_tokens..." },
          { id: nanoid(), name: "assistant1_functions", type: "textarea", placeholder: "Available functions for this agent" },
          { id: nanoid(), name: "assistant2_name", type: "text", placeholder: "Code Reviewer (Optional)" },
          { id: nanoid(), name: "assistant2_system", type: "textarea", placeholder: "System message for reviewer" },
          { id: nanoid(), name: "assistant2_llm_config", type: "textarea", placeholder: "LLM configuration" },
          { id: nanoid(), name: "assistant2_functions", type: "textarea", placeholder: "Available functions" },
          { id: nanoid(), name: "initiation", type: "textarea", placeholder: "How conversation starts" },
          { id: nanoid(), name: "turn_taking", type: "textarea", placeholder: "How agents take turns" },
          { id: nanoid(), name: "max_rounds", type: "number", defaultValue: 10 },
          { id: nanoid(), name: "termination_condition", type: "textarea", placeholder: "When conversation ends" },
          { id: nanoid(), name: "allowed_languages", type: "text", placeholder: "Python, JavaScript, Bash..." },
          { id: nanoid(), name: "execution_environment", type: "text", placeholder: "Docker, local, cloud sandbox..." },
          { id: nanoid(), name: "safety_constraints", type: "textarea", placeholder: "Security restrictions and sandboxing" },
          { id: nanoid(), name: "input_source", type: "text", placeholder: "API, webhook, UI..." },
          { id: nanoid(), name: "output_destination", type: "text", placeholder: "Where results go" },
          { id: nanoid(), name: "state_persistence", type: "textarea", placeholder: "How state is saved between sessions" },
          { id: nanoid(), name: "teachability_config", type: "textarea", placeholder: "Learning and memory configuration" },
          { id: nanoid(), name: "rag_integration", type: "textarea", placeholder: "RAG setup for knowledge retrieval" },
          { id: nanoid(), name: "tool_use", type: "textarea", placeholder: "External tools and APIs available" },
          { id: nanoid(), name: "container_config", type: "textarea", placeholder: "Docker/container setup" },
          { id: nanoid(), name: "api_wrapper", type: "textarea", placeholder: "FastAPI/Flask wrapper details" },
          { id: nanoid(), name: "monitoring", type: "textarea", placeholder: "Logging and monitoring strategy" },
          { id: nanoid(), name: "system_goal", type: "text", placeholder: "What this system accomplishes" }
        ],
        tags: ["autogen", "code-generation", "multi-agent", "collaborative", "combination", ...otherTags],
        category: "automation",
        isFramework: false,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    priority: 86
  },

  // Sora + Automation Platform
  {
    tags: ["sora"],
    matcher: (selected) => selected.includes("sora") && isAutomationPlatform(selected.join(",")),
    generator: (selected) => {
      const platform = selected.find(t => isAutomationPlatform(t)) || "automation"
      return {
        id: generateCombinationId(["sora", platform]),
        name: `Sora → ${platform.toUpperCase()} Video Automation`,
        template: `# Sora Video Generation via ${platform.toUpperCase()}

**Automation Name**: {automation_name}
**Video Generation Purpose**: {video_purpose}

## ${platform.toUpperCase()} Trigger
**Trigger Type**: {trigger_type}
**Trigger Configuration**: {trigger_config}
**Input Data**: {input_data}

## Sora Prompt Building
**Scene Template**: {scene_template}
**Dynamic Elements**: {dynamic_elements}
**Camera Instructions**: {camera_instructions}
**Style Parameters**: {style_parameters}

## Video Generation Configuration
**Duration**: {duration}
**Quality**: {quality}
**Aspect Ratio**: {aspect_ratio}
**Audio Intent**: {audio_intent}

## API Integration
**Sora API Endpoint**: {sora_endpoint}
**Authentication**: {sora_auth}
**Request Format**:
\`\`\`json
{request_format}
\`\`\`

## Post-Processing
**Video Storage**: {video_storage}
**Thumbnail Generation**: {thumbnail_gen}
**Metadata Tagging**: {metadata}

## Distribution Actions
**Primary Destination**: {primary_destination}
**Social Media**: {social_media}
**Notifications**: {notifications}

## Error Handling
**Failed Generation**: {error_handling}
**Retry Logic**: {retry_logic}
**Fallback Content**: {fallback}

Create an automated Sora video pipeline for: {automation_goal}`,
        variables: [
          { id: nanoid(), name: "automation_name", type: "text", placeholder: "Social Media Video Generator" },
          { id: nanoid(), name: "video_purpose", type: "textarea", placeholder: "Generate product showcase videos" },
          { id: nanoid(), name: "trigger_type", type: "select", options: [
            { value: "webhook", label: "Webhook" },
            { value: "schedule", label: "Schedule" },
            { value: "data-change", label: "Data Change" },
            { value: "api-call", label: "API Call" }
          ]},
          { id: nanoid(), name: "trigger_config", type: "textarea", placeholder: "Trigger settings and parameters" },
          { id: nanoid(), name: "input_data", type: "textarea", placeholder: "Expected input data structure" },
          { id: nanoid(), name: "scene_template", type: "textarea", placeholder: "Base Sora prompt template with variables" },
          { id: nanoid(), name: "dynamic_elements", type: "textarea", placeholder: "Elements populated from trigger data" },
          { id: nanoid(), name: "camera_instructions", type: "textarea", placeholder: "Dynamic camera movement instructions" },
          { id: nanoid(), name: "style_parameters", type: "textarea", placeholder: "Visual style, lighting, mood..." },
          { id: nanoid(), name: "duration", type: "select", options: [
            { value: "short", label: "1-3 seconds" },
            { value: "medium", label: "3-5 seconds" },
            { value: "long", label: "5-10 seconds" }
          ]},
          { id: nanoid(), name: "quality", type: "select", options: [
            { value: "standard", label: "Standard" },
            { value: "high", label: "High" },
            { value: "ultra", label: "Ultra HD" }
          ]},
          { id: nanoid(), name: "aspect_ratio", type: "select", options: [
            { value: "16:9", label: "16:9 Widescreen" },
            { value: "9:16", label: "9:16 Vertical" },
            { value: "1:1", label: "1:1 Square" }
          ]},
          { id: nanoid(), name: "audio_intent", type: "textarea", placeholder: "Background music, SFX requirements" },
          { id: nanoid(), name: "sora_endpoint", type: "text", placeholder: "Sora API URL" },
          { id: nanoid(), name: "sora_auth", type: "text", placeholder: "API key or auth method" },
          { id: nanoid(), name: "request_format", type: "textarea", placeholder: "JSON structure for Sora API request" },
          { id: nanoid(), name: "video_storage", type: "text", placeholder: "S3, Cloudinary, Vercel Blob..." },
          { id: nanoid(), name: "thumbnail_gen", type: "textarea", placeholder: "Thumbnail extraction strategy" },
          { id: nanoid(), name: "metadata", type: "textarea", placeholder: "Tags, titles, descriptions to add" },
          { id: nanoid(), name: "primary_destination", type: "text", placeholder: "Where video is published" },
          { id: nanoid(), name: "social_media", type: "textarea", placeholder: "Auto-post to platforms" },
          { id: nanoid(), name: "notifications", type: "textarea", placeholder: "Notification strategy on completion" },
          { id: nanoid(), name: "error_handling", type: "textarea", placeholder: "What to do if generation fails" },
          { id: nanoid(), name: "retry_logic", type: "textarea", placeholder: "Retry attempts and delays" },
          { id: nanoid(), name: "fallback", type: "textarea", placeholder: "Fallback content if all retries fail" },
          { id: nanoid(), name: "automation_goal", type: "text", placeholder: "What this automation achieves" }
        ],
        tags: ["sora", platform, "video-generation", "automation", "combination", ...selected],
        category: "video",
        isFramework: false,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    priority: 84
  },

  // Framework + Technique combinations (e.g., "costar" + "chain-of-thought")
  {
    tags: ["framework", "technique"],
    matcher: (selected) => {
      const hasFramework = selected.some(t => ["costar", "ape", "race", "roses", "crispe", "trace", "role", "rtf"].includes(t))
      const hasTechnique = selected.some(t => ["chain-of-thought", "few-shot", "react", "zero-shot", "self-consistency", "tree-of-thoughts"].includes(t))
      return hasFramework && hasTechnique
    },
    generator: (selected) => {
      const framework = selected.find(t => ["costar", "ape", "race", "roses", "crispe", "trace", "role", "rtf"].includes(t)) || "framework"
      const technique = selected.find(t => ["chain-of-thought", "few-shot", "react", "zero-shot", "self-consistency", "tree-of-thoughts"].includes(t)) || "technique"
      
      return {
        id: generateCombinationId([framework, technique]),
        name: `${framework.toUpperCase()} + ${technique.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`,
        template: `# ${framework.toUpperCase()} Framework with ${technique.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}

This prompt combines the structure of ${framework.toUpperCase()} with ${technique.split("-").join(" ")} reasoning.

## ${framework.toUpperCase()} Structure

${framework === "costar" ? `**Context**: {context}
**Objective**: {objective}
**Style**: {style}
**Tone**: {tone}
**Audience**: {audience}
**Response Format**: {response_format}` : ""}
${framework === "ape" ? `**Action**: {action}
**Purpose**: {purpose}
**Expectation**: {expectation}` : ""}
${framework === "race" ? `**Role**: {role}
**Action**: {action}
**Context**: {context}
**Expectation**: {expectation}` : ""}

## ${technique.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Enhancement

${technique === "chain-of-thought" ? "Let's approach this step by step:" : ""}
${technique === "few-shot" ? "Here are examples of the expected reasoning:" : ""}
${technique === "react" ? "Use this Thought-Action-Observation cycle:" : ""}

**Reasoning Instructions**: {reasoning_instructions}

${technique === "chain-of-thought" ? `**Step-by-Step Requirements**:
1. {step1}
2. {step2}
3. {step3}
4. Final answer` : ""}

${technique === "few-shot" ? `**Example 1**:
Input: {example1_input}
Reasoning: {example1_reasoning}
Output: {example1_output}

**Example 2**:
Input: {example2_input}
Reasoning: {example2_reasoning}
Output: {example2_output}` : ""}

## Your Task
{task_description}`,
        variables: [
          // Framework-specific variables
          ...(framework === "costar" ? [
            { id: nanoid(), name: "context", type: "textarea", placeholder: "Background information..." },
            { id: nanoid(), name: "objective", type: "textarea", placeholder: "What to accomplish..." },
            { id: nanoid(), name: "style", type: "text", placeholder: "Writing style..." },
            { id: nanoid(), name: "tone", type: "text", placeholder: "Communication tone..." },
            { id: nanoid(), name: "audience", type: "text", placeholder: "Target audience..." },
            { id: nanoid(), name: "response_format", type: "text", placeholder: "Output format..." }
          ] : []),
          ...(framework === "ape" ? [
            { id: nanoid(), name: "action", type: "textarea", placeholder: "Action to take..." },
            { id: nanoid(), name: "purpose", type: "textarea", placeholder: "Purpose/why..." },
            { id: nanoid(), name: "expectation", type: "textarea", placeholder: "Expected outcome..." }
          ] : []),
          ...(framework === "race" ? [
            { id: nanoid(), name: "role", type: "text", placeholder: "AI role..." },
            { id: nanoid(), name: "action", type: "textarea", placeholder: "What to do..." },
            { id: nanoid(), name: "context", type: "textarea", placeholder: "Background..." },
            { id: nanoid(), name: "expectation", type: "textarea", placeholder: "Expected result..." }
          ] : []),
          
          // Technique-specific variables
          { id: nanoid(), name: "reasoning_instructions", type: "textarea", placeholder: `How to apply ${technique} reasoning...` },
          
          ...(technique === "chain-of-thought" ? [
            { id: nanoid(), name: "step1", type: "text", placeholder: "First reasoning step..." },
            { id: nanoid(), name: "step2", type: "text", placeholder: "Second reasoning step..." },
            { id: nanoid(), name: "step3", type: "text", placeholder: "Third reasoning step..." }
          ] : []),
          
          ...(technique === "few-shot" ? [
            { id: nanoid(), name: "example1_input", type: "textarea", placeholder: "First example input..." },
            { id: nanoid(), name: "example1_reasoning", type: "textarea", placeholder: "First example reasoning..." },
            { id: nanoid(), name: "example1_output", type: "textarea", placeholder: "First example output..." },
            { id: nanoid(), name: "example2_input", type: "textarea", placeholder: "Second example input..." },
            { id: nanoid(), name: "example2_reasoning", type: "textarea", placeholder: "Second example reasoning..." },
            { id: nanoid(), name: "example2_output", type: "textarea", placeholder: "Second example output..." }
          ] : []),
          
          { id: nanoid(), name: "task_description", type: "textarea", placeholder: "Describe the actual task..." }
        ],
        tags: [framework, technique, "combination", "hybrid", "advanced", ...selected],
        category: "text",
        isFramework: false,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    priority: 92
  },

  // Persona + Any Platform
  {
    tags: ["persona"],
    matcher: (selected) => selected.includes("persona") && (isAutomationPlatform(selected.join(",")) || selected.some(t => t === "sora")),
    generator: (selected) => {
      const platform = selected.find(t => isAutomationPlatform(t) || t === "sora") || "platform"
      return {
        id: generateCombinationId(["persona", platform]),
        name: `Persona-Driven ${platform.toUpperCase()} Automation`,
        template: `# Persona-Based ${platform.toUpperCase()} System

**System Name**: {system_name}
**Platform**: ${platform}

## Persona Definition
**Name**: {persona_name}
**Role**: {persona_role}
**Background**: {persona_background}
**Expertise**: {persona_expertise}
**Communication Style**: {communication_style}
**Decision-Making Approach**: {decision_approach}

## Personality Traits
**Key Traits**: {key_traits}
**Values**: {values}
**Quirks**: {quirks}

## ${platform.toUpperCase()} Integration
**How Persona Manifests**: {persona_manifestation}
**Interaction Points**: {interaction_points}

${platform === "sora" ? `## Video Generation Style
**Visual Aesthetic**: {visual_aesthetic}
**Narrative Voice**: {narrative_voice}
**Scene Preferences**: {scene_preferences}` : ""}

${isAutomationPlatform(platform) ? `## Automation Behavior
**Trigger Responses**: {trigger_responses}
**Action Priorities**: {action_priorities}
**Communication Templates**: {communication_templates}` : ""}

## Consistency Guidelines
**Language Patterns**: {language_patterns}
**Response Templates**: {response_templates}
**Boundary Conditions**: {boundary_conditions}

Create a persona-driven system for: {system_goal}`,
        variables: [
          { id: nanoid(), name: "system_name", type: "text", placeholder: "Brand Ambassador Bot" },
          { id: nanoid(), name: "persona_name", type: "text", placeholder: "Alex Chen" },
          { id: nanoid(), name: "persona_role", type: "text", placeholder: "Customer Success Champion" },
          { id: nanoid(), name: "persona_background", type: "textarea", placeholder: "Former support lead with 10+ years..." },
          { id: nanoid(), name: "persona_expertise", type: "textarea", placeholder: "Product knowledge, empathy, problem-solving..." },
          { id: nanoid(), name: "communication_style", type: "textarea", placeholder: "Warm, professional, solution-oriented..." },
          { id: nanoid(), name: "decision_approach", type: "textarea", placeholder: "Data-driven but empathetic..." },
          { id: nanoid(), name: "key_traits", type: "textarea", placeholder: "Patient, thorough, proactive..." },
          { id: nanoid(), name: "values", type: "textarea", placeholder: "Customer satisfaction, transparency..." },
          { id: nanoid(), name: "quirks", type: "textarea", placeholder: "Uses analogies, loves emojis..." },
          { id: nanoid(), name: "persona_manifestation", type: "textarea", placeholder: `How persona shows up in ${platform}...` },
          { id: nanoid(), name: "interaction_points", type: "textarea", placeholder: "Where users interact with persona..." },
          ...(platform === "sora" ? [
            { id: nanoid(), name: "visual_aesthetic", type: "textarea", placeholder: "Cinematic style, color palette..." },
            { id: nanoid(), name: "narrative_voice", type: "textarea", placeholder: "Storytelling approach..." },
            { id: nanoid(), name: "scene_preferences", type: "textarea", placeholder: "Preferred scene types..." }
          ] : []),
          ...(isAutomationPlatform(platform) ? [
            { id: nanoid(), name: "trigger_responses", type: "textarea", placeholder: "How persona responds to triggers..." },
            { id: nanoid(), name: "action_priorities", type: "textarea", placeholder: "What actions persona takes first..." },
            { id: nanoid(), name: "communication_templates", type: "textarea", placeholder: "Message templates in persona voice..." }
          ] : []),
          { id: nanoid(), name: "language_patterns", type: "textarea", placeholder: "Characteristic phrases and patterns..." },
          { id: nanoid(), name: "response_templates", type: "textarea", placeholder: "Template responses in persona voice..." },
          { id: nanoid(), name: "boundary_conditions", type: "textarea", placeholder: "What persona won't do or say..." },
          { id: nanoid(), name: "system_goal", type: "text", placeholder: "What this persona-driven system achieves" }
        ],
        tags: ["persona", platform, "character", "consistency", "combination", ...selected],
        category: platform === "sora" ? "video" : "automation",
        isFramework: false,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    priority: 83
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
