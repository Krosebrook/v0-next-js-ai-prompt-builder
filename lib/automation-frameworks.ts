import type { Prompt } from "./types"

export const automationFrameworks: Omit<Prompt, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Make.com Conversational Workflow",
    template: `# Workflow Description
{workflow_description}

# Trigger Event
When {trigger_event}

# Actions Sequence
{actions_sequence}

# Data Transformations
{data_transformations}

# Error Handling
If something fails: {error_handling}`,
    variables: [
      {
        id: "workflow_description",
        name: "workflow_description",
        type: "textarea",
        placeholder: "Describe the workflow in plain language, e.g., 'When someone posts in Slack, summarize it and send to Teams'",
      },
      {
        id: "trigger_event",
        name: "trigger_event",
        type: "textarea",
        placeholder: "What event starts this workflow? e.g., 'a new email arrives', 'form is submitted', 'scheduled daily at 9am'",
      },
      {
        id: "actions_sequence",
        name: "actions_sequence",
        type: "textarea",
        placeholder: "List the actions in order:\n1. Get the data\n2. Transform it\n3. Send to destination",
      },
      {
        id: "data_transformations",
        name: "data_transformations",
        type: "textarea",
        placeholder: "How should data be transformed? e.g., 'Extract email address', 'Format date as MM/DD/YYYY', 'Summarize text'",
      },
      {
        id: "error_handling",
        name: "error_handling",
        type: "select",
        options: [
          { value: "retry_3_times", label: "Retry 3 times then stop" },
          { value: "notify_me", label: "Send me a notification" },
          { value: "use_default", label: "Use default value and continue" },
          { value: "stop_immediately", label: "Stop immediately" },
        ],
      },
    ],
    tags: ["automation", "make.com", "no-code", "workflow"],
    category: "automation",
  },
  {
    name: "Zapier Conversational Zap",
    template: `# What I Want to Automate
{automation_goal}

# Starting Trigger
This should start when {trigger}

# Apps Involved
{apps_list}

# Step-by-Step Actions
{steps}

# Filters & Conditions
Only run if: {conditions}

# Expected Result
{expected_result}`,
    variables: [
      {
        id: "automation_goal",
        name: "automation_goal",
        type: "textarea",
        placeholder: "e.g., 'Log new support chats into Jira and notify Slack channel'",
      },
      {
        id: "trigger",
        name: "trigger",
        type: "textarea",
        placeholder: "e.g., 'new email in Gmail', 'form submission in Typeform', 'new row in Google Sheets'",
      },
      {
        id: "apps_list",
        name: "apps_list",
        type: "textarea",
        placeholder: "List the apps: Gmail, Slack, Jira, Google Sheets, etc.",
      },
      {
        id: "steps",
        name: "steps",
        type: "textarea",
        placeholder: "Describe each action:\n1. Receive email\n2. Extract key info\n3. Create Jira ticket\n4. Send Slack notification",
      },
      {
        id: "conditions",
        name: "conditions",
        type: "textarea",
        placeholder: "e.g., 'Subject contains [URGENT]', 'From specific email domain', 'Amount > $1000'",
        defaultValue: "No conditions - run every time",
      },
      {
        id: "expected_result",
        name: "expected_result",
        type: "textarea",
        placeholder: "What should happen at the end? e.g., 'Ticket created in Jira with all email details, team notified in #support channel'",
      },
    ],
    tags: ["automation", "zapier", "integration", "no-code"],
    category: "automation",
  },
  {
    name: "n8n Workflow Builder",
    template: `# Workflow Purpose
{purpose}

# Trigger Type
{trigger_type}

# Workflow Steps
{workflow_steps}

# Data Processing
{data_processing}

# LLM Integration (Optional)
{llm_integration}

# Output Destination
{output_destination}`,
    variables: [
      {
        id: "purpose",
        name: "purpose",
        type: "textarea",
        placeholder: "What should this workflow accomplish? e.g., 'Parse support requests and route to appropriate team'",
      },
      {
        id: "trigger_type",
        name: "trigger_type",
        type: "select",
        options: [
          { value: "webhook", label: "Webhook (HTTP request)" },
          { value: "schedule", label: "Schedule (cron/interval)" },
          { value: "chat", label: "Chat message" },
          { value: "email", label: "Email received" },
          { value: "file", label: "File uploaded" },
          { value: "database", label: "Database change" },
        ],
      },
      {
        id: "workflow_steps",
        name: "workflow_steps",
        type: "textarea",
        placeholder: "Describe the workflow logic:\n1. Receive trigger\n2. Parse data\n3. Call API\n4. Transform response\n5. Send result",
      },
      {
        id: "data_processing",
        name: "data_processing",
        type: "textarea",
        placeholder: "How should data be processed? e.g., 'Extract JSON fields', 'Convert CSV to JSON', 'Aggregate results'",
      },
      {
        id: "llm_integration",
        name: "llm_integration",
        type: "textarea",
        placeholder: "Optional: How should AI analyze or process the data? e.g., 'Summarize customer feedback', 'Extract action items'",
        defaultValue: "No LLM processing needed",
      },
      {
        id: "output_destination",
        name: "output_destination",
        type: "textarea",
        placeholder: "Where should results go? e.g., 'Google Sheets row', 'Slack message', 'Database record', 'Email'",
      },
    ],
    tags: ["automation", "n8n", "workflow", "self-hosted"],
    category: "automation",
  },
  {
    name: "Pipedream Conversational Flow",
    template: `# What I'm Building
{flow_description}

# Event Source
{event_source}

# Processing Steps
{processing_steps}

# API Integrations
{api_integrations}

# Multi-turn Context (Optional)
{conversation_context}

# Response Format
{response_format}`,
    variables: [
      {
        id: "flow_description",
        name: "flow_description",
        type: "textarea",
        placeholder: "e.g., 'Email me daily weather and suggest outfit based on temperature'",
      },
      {
        id: "event_source",
        name: "event_source",
        type: "select",
        options: [
          { value: "http", label: "HTTP Request" },
          { value: "schedule", label: "Schedule (cron)" },
          { value: "email", label: "Email" },
          { value: "webhook", label: "App Webhook" },
          { value: "sse", label: "Server-Sent Events" },
        ],
      },
      {
        id: "processing_steps",
        name: "processing_steps",
        type: "textarea",
        placeholder: "Describe the logic:\n1. Fetch weather data\n2. Analyze temperature\n3. Generate outfit suggestion\n4. Format email",
      },
      {
        id: "api_integrations",
        name: "api_integrations",
        type: "textarea",
        placeholder: "Which APIs should be called? e.g., 'OpenWeather API', 'OpenAI API', 'SendGrid'",
      },
      {
        id: "conversation_context",
        name: "conversation_context",
        type: "textarea",
        placeholder: "Optional: Should the flow remember previous interactions? How?",
        defaultValue: "No context needed - stateless",
      },
      {
        id: "response_format",
        name: "response_format",
        type: "select",
        options: [
          { value: "email", label: "Email" },
          { value: "json", label: "JSON response" },
          { value: "slack", label: "Slack message" },
          { value: "sms", label: "SMS" },
          { value: "discord", label: "Discord message" },
        ],
      },
    ],
    tags: ["automation", "pipedream", "serverless", "api"],
    category: "automation",
  },
  {
    name: "LangChain Conversational Agent",
    template: `# Agent Purpose
{agent_purpose}

# Agent Personality
{agent_personality}

# Available Tools
{available_tools}

# Knowledge Sources (RAG)
{knowledge_sources}

# Memory Configuration
{memory_config}

# Conversation Flow
{conversation_flow}

# Safety Constraints
{safety_constraints}`,
    variables: [
      {
        id: "agent_purpose",
        name: "agent_purpose",
        type: "textarea",
        placeholder: "What should this agent do? e.g., 'Answer customer questions using our documentation and create support tickets when needed'",
      },
      {
        id: "agent_personality",
        name: "agent_personality",
        type: "text",
        placeholder: "e.g., 'Helpful and professional', 'Friendly and casual', 'Technical and precise'",
      },
      {
        id: "available_tools",
        name: "available_tools",
        type: "textarea",
        placeholder: "List tools the agent can use:\n- Search documentation\n- Create support ticket\n- Check order status\n- Send email",
      },
      {
        id: "knowledge_sources",
        name: "knowledge_sources",
        type: "textarea",
        placeholder: "What data should the agent have access to? e.g., 'Company docs', 'Product manuals', 'FAQ database', 'Previous conversations'",
      },
      {
        id: "memory_config",
        name: "memory_config",
        type: "select",
        options: [
          { value: "conversation_buffer", label: "Remember entire conversation" },
          { value: "conversation_summary", label: "Remember summary of conversation" },
          { value: "conversation_window", label: "Remember last N messages" },
          { value: "none", label: "No memory (stateless)" },
        ],
      },
      {
        id: "conversation_flow",
        name: "conversation_flow",
        type: "textarea",
        placeholder: "Describe how conversations should flow:\n1. Greet user\n2. Understand their question\n3. Search relevant docs\n4. Provide answer\n5. Ask if they need more help",
      },
      {
        id: "safety_constraints",
        name: "safety_constraints",
        type: "textarea",
        placeholder: "What should the agent NEVER do? e.g., 'Share customer data', 'Process refunds over $500', 'Make medical recommendations'",
      },
    ],
    tags: ["automation", "langchain", "ai-agent", "rag"],
    category: "automation",
  },
  {
    name: "CrewAI Multi-Agent Workflow",
    template: `# Crew Mission
{crew_mission}

# Agent Roles
{agent_roles}

# Task Assignment
{task_assignment}

# Inter-Agent Communication
{agent_communication}

# Input Triggers
{input_triggers}

# Success Criteria
{success_criteria}

# Output Delivery
{output_delivery}`,
    variables: [
      {
        id: "crew_mission",
        name: "crew_mission",
        type: "textarea",
        placeholder: "What should this crew accomplish? e.g., 'Handle customer refund requests by coordinating between support and finance'",
      },
      {
        id: "agent_roles",
        name: "agent_roles",
        type: "textarea",
        placeholder: "Define each agent:\n- Support Agent: Validates request\n- Finance Agent: Processes refund\n- Manager Agent: Approves high-value refunds",
      },
      {
        id: "task_assignment",
        name: "task_assignment",
        type: "textarea",
        placeholder: "How are tasks distributed?\ne.g., 'Support Agent receives request first, passes to Finance if valid, escalates to Manager if > $500'",
      },
      {
        id: "agent_communication",
        name: "agent_communication",
        type: "textarea",
        placeholder: "How do agents communicate?\ne.g., 'Support Agent messages Finance Agent with validated details', 'All agents can see shared context'",
      },
      {
        id: "input_triggers",
        name: "input_triggers",
        type: "select",
        options: [
          { value: "chat", label: "Chat message (Slack, Discord, Teams)" },
          { value: "email", label: "Email" },
          { value: "form", label: "Form submission" },
          { value: "api", label: "API call" },
          { value: "schedule", label: "Scheduled task" },
        ],
      },
      {
        id: "success_criteria",
        name: "success_criteria",
        type: "textarea",
        placeholder: "How do you know the mission succeeded?\ne.g., 'Refund processed, customer notified, transaction logged'",
      },
      {
        id: "output_delivery",
        name: "output_delivery",
        type: "textarea",
        placeholder: "Where/how should results be delivered?\ne.g., 'Email confirmation to customer, Slack notification to team, record in database'",
      },
    ],
    tags: ["automation", "crewai", "multi-agent", "orchestration"],
    category: "automation",
  },
  {
    name: "AutoGen Conversable Agent",
    template: `# Agent Scenario
{scenario}

# Conversable Agents
{conversable_agents}

# Human-in-the-Loop
{human_involvement}

# Iteration Process
{iteration_process}

# Code Generation (Optional)
{code_generation}

# Validation & Review
{validation}

# Termination Condition
{termination}`,
    variables: [
      {
        id: "scenario",
        name: "scenario",
        type: "textarea",
        placeholder: "What problem are agents solving? e.g., 'Generate a CSV parser with error handling that validates email addresses'",
      },
      {
        id: "conversable_agents",
        name: "conversable_agents",
        type: "textarea",
        placeholder: "Define the agents:\n- Coder Agent: Writes code\n- Reviewer Agent: Reviews and tests\n- User Proxy: Represents human preferences",
      },
      {
        id: "human_involvement",
        name: "human_involvement",
        type: "select",
        options: [
          { value: "always", label: "Always - review every decision" },
          { value: "approval", label: "For approvals only" },
          { value: "errors", label: "Only when errors occur" },
          { value: "never", label: "Fully autonomous" },
        ],
      },
      {
        id: "iteration_process",
        name: "iteration_process",
        type: "textarea",
        placeholder: "How should agents iterate?\ne.g., '1. Coder writes solution\n2. Reviewer tests and finds issues\n3. Coder fixes issues\n4. Repeat until tests pass'",
      },
      {
        id: "code_generation",
        name: "code_generation",
        type: "textarea",
        placeholder: "Optional: What code should be generated? Language, framework, requirements?",
        defaultValue: "No code generation needed",
      },
      {
        id: "validation",
        name: "validation",
        type: "textarea",
        placeholder: "How is success validated?\ne.g., 'Unit tests pass', 'Handles edge cases', 'Meets performance requirements'",
      },
      {
        id: "termination",
        name: "termination",
        type: "textarea",
        placeholder: "When should the conversation end?\ne.g., 'All tests pass', 'Max 5 iterations reached', 'Human approves solution'",
      },
    ],
    tags: ["automation", "autogen", "code-generation", "collaborative"],
    category: "automation",
  },
]
