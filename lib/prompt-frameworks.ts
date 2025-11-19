import type { Prompt } from "./types"
import { soraFrameworks } from "./sora-frameworks"
import { automationFrameworks } from "./automation-frameworks"

export const promptFrameworks: Omit<Prompt, "id" | "createdAt" | "updatedAt">[] = [
  // Sora frameworks (10)
  ...soraFrameworks,
  
  // Automation frameworks (7)
  ...automationFrameworks,
  
  // Existing text-based frameworks (25)
  {
    name: "COSTAR Framework",
    template: `# Context
{context}

# Objective
{objective}

# Style
{style}

# Tone
{tone}

# Audience
{audience}

# Response Format
{response_format}`,
    variables: [
      {
        id: "context",
        name: "context",
        type: "textarea",
        placeholder: "Provide background information about the task...",
      },
      {
        id: "objective",
        name: "objective",
        type: "textarea",
        placeholder: "Define what you want the AI to accomplish...",
      },
      {
        id: "style",
        name: "style",
        type: "text",
        placeholder: "e.g., Professional expert, Casual blogger, Technical writer",
      },
      {
        id: "tone",
        name: "tone",
        type: "select",
        options: [
          { value: "formal", label: "Formal" },
          { value: "casual", label: "Casual" },
          { value: "humorous", label: "Humorous" },
          { value: "empathetic", label: "Empathetic" },
          { value: "authoritative", label: "Authoritative" },
          { value: "conversational", label: "Conversational" },
        ],
      },
      {
        id: "audience",
        name: "audience",
        type: "text",
        placeholder: "e.g., Beginners, Domain experts, C-level executives",
      },
      {
        id: "response_format",
        name: "response_format",
        type: "select",
        options: [
          { value: "paragraph", label: "Paragraph" },
          { value: "bullet_points", label: "Bullet Points" },
          { value: "numbered_list", label: "Numbered List" },
          { value: "json", label: "JSON" },
          { value: "markdown", label: "Markdown" },
          { value: "table", label: "Table" },
        ],
      },
    ],
    tags: ["framework", "structured", "comprehensive"],
  },
  {
    name: "APE Framework (Action-Purpose-Expectation)",
    template: `# Action
{action}

# Purpose
{purpose}

# Expectation
{expectation}`,
    variables: [
      {
        id: "action",
        name: "action",
        type: "textarea",
        placeholder: "What specific action should the AI take?",
      },
      {
        id: "purpose",
        name: "purpose",
        type: "textarea",
        placeholder: "Why is this task needed? What problem does it solve?",
      },
      {
        id: "expectation",
        name: "expectation",
        type: "textarea",
        placeholder: "What should the output look like? Any constraints or requirements?",
      },
    ],
    tags: ["framework", "beginner-friendly", "analysis"],
  },
  {
    name: "RACE Framework",
    template: `# Role
You are a {role}.

# Action
{action}

# Context
{context}

# Expectation
{expectation}`,
    variables: [
      {
        id: "role",
        name: "role",
        type: "text",
        placeholder: "e.g., Senior software engineer, Marketing strategist",
      },
      {
        id: "action",
        name: "action",
        type: "textarea",
        placeholder: "What should be done?",
      },
      {
        id: "context",
        name: "context",
        type: "textarea",
        placeholder: "Background information and constraints...",
      },
      {
        id: "expectation",
        name: "expectation",
        type: "textarea",
        placeholder: "Expected output format and quality standards...",
      },
    ],
    tags: ["framework", "professional", "domain-expertise"],
  },
  {
    name: "ROSES Framework",
    template: `# Role
You are a {role}.

# Objective
{objective}

# Style
Write in the style of {style}.

# Example
Here's an example of what I'm looking for:
{example}

# Scenario
{scenario}`,
    variables: [
      {
        id: "role",
        name: "role",
        type: "text",
        placeholder: "e.g., Creative copywriter, Brand storyteller",
      },
      {
        id: "objective",
        name: "objective",
        type: "textarea",
        placeholder: "What is the creative goal?",
      },
      {
        id: "style",
        name: "style",
        type: "text",
        placeholder: "e.g., Apple's minimalist copy, Nike's motivational tone",
      },
      {
        id: "example",
        name: "example",
        type: "textarea",
        placeholder: "Provide a concrete example...",
      },
      {
        id: "scenario",
        name: "scenario",
        type: "textarea",
        placeholder: "Describe the specific scenario or use case...",
      },
    ],
    tags: ["framework", "creative", "brand-consistency"],
  },
  {
    name: "CRISPE Framework",
    template: `# Capacity and Role
You are a {role}.

# Insight
{insight}

# Statement
{statement}

# Personality
{personality}

# Experiment
{experiment}`,
    variables: [
      {
        id: "role",
        name: "role",
        type: "text",
        placeholder: "e.g., Data scientist, UX researcher",
      },
      {
        id: "insight",
        name: "insight",
        type: "textarea",
        placeholder: "Background context and key insights...",
      },
      {
        id: "statement",
        name: "statement",
        type: "textarea",
        placeholder: "What you want the AI to do...",
      },
      {
        id: "personality",
        name: "personality",
        type: "text",
        placeholder: "e.g., Analytical, Creative, Methodical",
      },
      {
        id: "experiment",
        name: "experiment",
        type: "textarea",
        placeholder: "Instructions for multiple attempts or variations...",
      },
    ],
    tags: ["framework", "multi-step", "experimental"],
  },
  {
    name: "TRACE Framework",
    template: `# Task
{task}

# Requirements
{requirements}

# Audience
{audience}

# Context
{context}

# Evaluation Criteria
{evaluation_criteria}`,
    variables: [
      {
        id: "task",
        name: "task",
        type: "textarea",
        placeholder: "Clearly define the task...",
      },
      {
        id: "requirements",
        name: "requirements",
        type: "textarea",
        placeholder: "List all requirements and constraints...",
      },
      {
        id: "audience",
        name: "audience",
        type: "text",
        placeholder: "Who is this for?",
      },
      {
        id: "context",
        name: "context",
        type: "textarea",
        placeholder: "Relevant background information...",
      },
      {
        id: "evaluation_criteria",
        name: "evaluation_criteria",
        type: "textarea",
        placeholder: "How will success be measured?",
      },
    ],
    tags: ["framework", "analytical", "quality-control"],
  },
  {
    name: "ROLE Framework",
    template: `# Role
{role}

# Objectives
{objectives}

# Limitations
{limitations}

# Evaluation
{evaluation}`,
    variables: [
      {
        id: "role",
        name: "role",
        type: "text",
        placeholder: "Define the AI's role...",
      },
      {
        id: "objectives",
        name: "objectives",
        type: "textarea",
        placeholder: "What should be accomplished?",
      },
      {
        id: "limitations",
        name: "limitations",
        type: "textarea",
        placeholder: "What constraints or boundaries exist?",
      },
      {
        id: "evaluation",
        name: "evaluation",
        type: "textarea",
        placeholder: "How should the output be evaluated?",
      },
    ],
    tags: ["framework", "governance", "safety"],
  },
  {
    name: "Chain of Thought (CoT)",
    template: `{task_description}

Let's think step by step:
{reasoning_steps}

Now provide the final answer.`,
    variables: [
      {
        id: "task_description",
        name: "task_description",
        type: "textarea",
        placeholder: "Describe the problem or question...",
      },
      {
        id: "reasoning_steps",
        name: "reasoning_steps",
        type: "textarea",
        placeholder: "Optional: Provide example reasoning steps to guide the AI...",
        defaultValue: "",
      },
    ],
    tags: ["technique", "reasoning", "step-by-step"],
  },
  {
    name: "Few-Shot Learning",
    template: `{task_instruction}

# Examples
{examples}

# Now solve this
{new_problem}`,
    variables: [
      {
        id: "task_instruction",
        name: "task_instruction",
        type: "textarea",
        placeholder: "Explain the task...",
      },
      {
        id: "examples",
        name: "examples",
        type: "textarea",
        placeholder: "Provide 2-5 input-output examples...",
      },
      {
        id: "new_problem",
        name: "new_problem",
        type: "textarea",
        placeholder: "The new problem to solve...",
      },
    ],
    tags: ["technique", "learning", "examples"],
  },
  {
    name: "ReAct (Reason + Act)",
    template: `{task_description}

You have access to the following tools:
{available_tools}

Use this format:
Thought: [your reasoning]
Action: [tool to use]
Observation: [result from tool]
... (repeat as needed)
Final Answer: [your conclusion]

Begin!`,
    variables: [
      {
        id: "task_description",
        name: "task_description",
        type: "textarea",
        placeholder: "Describe what needs to be accomplished...",
      },
      {
        id: "available_tools",
        name: "available_tools",
        type: "textarea",
        placeholder: "List available tools and their functions...",
      },
    ],
    tags: ["technique", "agent", "interactive"],
  },
  {
    name: "Zero-Shot Prompting",
    template: `{instruction}

{task}`,
    variables: [
      {
        id: "instruction",
        name: "instruction",
        type: "textarea",
        placeholder: "Clear, direct instruction...",
      },
      {
        id: "task",
        name: "task",
        type: "textarea",
        placeholder: "The specific task or question...",
      },
    ],
    tags: ["technique", "simple", "direct"],
  },
  {
    name: "Self-Consistency",
    template: `{problem}

Generate {num_solutions} different reasoning paths and solutions.

After generating all solutions, identify the most consistent answer across the different paths.`,
    variables: [
      {
        id: "problem",
        name: "problem",
        type: "textarea",
        placeholder: "State the problem or question...",
      },
      {
        id: "num_solutions",
        name: "num_solutions",
        type: "number",
        defaultValue: 3,
        min: 2,
        max: 10,
      },
    ],
    tags: ["technique", "verification", "reasoning"],
  },
  {
    name: "Tree of Thoughts",
    template: `{problem}

Explore this problem using a tree structure:
1. Generate {branching_factor} initial approaches
2. For each approach, evaluate its promise (1-10 scale)
3. For the top {keep_top} approaches, generate next steps
4. Continue this process for {depth} levels
5. Select the best complete solution path

Begin exploration:`,
    variables: [
      {
        id: "problem",
        name: "problem",
        type: "textarea",
        placeholder: "Complex problem to solve...",
      },
      {
        id: "branching_factor",
        name: "branching_factor",
        type: "slider",
        min: 2,
        max: 5,
        step: 1,
        defaultValue: 3,
      },
      {
        id: "keep_top",
        name: "keep_top",
        type: "slider",
        min: 1,
        max: 3,
        step: 1,
        defaultValue: 2,
      },
      {
        id: "depth",
        name: "depth",
        type: "slider",
        min: 2,
        max: 5,
        step: 1,
        defaultValue: 3,
      },
    ],
    tags: ["technique", "advanced", "exploration"],
  },
  {
    name: "Persona Pattern",
    template: `You are {persona_name}, a {persona_description}.

Your key traits:
{traits}

Your background:
{background}

Now, as this persona, respond to:
{task}`,
    variables: [
      {
        id: "persona_name",
        name: "persona_name",
        type: "text",
        placeholder: "e.g., Dr. Emily Chen",
      },
      {
        id: "persona_description",
        name: "persona_description",
        type: "text",
        placeholder: "e.g., senior AI researcher with 15 years experience",
      },
      {
        id: "traits",
        name: "traits",
        type: "textarea",
        placeholder: "List key personality traits and characteristics...",
      },
      {
        id: "background",
        name: "background",
        type: "textarea",
        placeholder: "Relevant background and expertise...",
      },
      {
        id: "task",
        name: "task",
        type: "textarea",
        placeholder: "What should this persona do or respond to?",
      },
    ],
    tags: ["pattern", "persona", "roleplay"],
  },
  {
    name: "Question Refinement Pattern",
    template: `Whenever I ask a question, suggest a better version of the question and ask me if I would like to use it instead.

My question: {original_question}`,
    variables: [
      {
        id: "original_question",
        name: "original_question",
        type: "textarea",
        placeholder: "Your initial question...",
      },
    ],
    tags: ["pattern", "meta", "refinement"],
  },
  {
    name: "Template Pattern",
    template: `I want you to create {output_type} following this structure:

{template_structure}

Fill in the template for:
{subject}`,
    variables: [
      {
        id: "output_type",
        name: "output_type",
        type: "text",
        placeholder: "e.g., a blog post, email, code function",
      },
      {
        id: "template_structure",
        name: "template_structure",
        type: "textarea",
        placeholder: "Define the template structure with placeholders...",
      },
      {
        id: "subject",
        name: "subject",
        type: "textarea",
        placeholder: "What should the template be about?",
      },
    ],
    tags: ["pattern", "structure", "template"],
  },
  {
    name: "Flipped Interaction Pattern",
    template: `I would like you to ask me questions to achieve {goal}.

You should ask questions until {completion_criteria}.

Ask me your first question.`,
    variables: [
      {
        id: "goal",
        name: "goal",
        type: "textarea",
        placeholder: "What goal should be achieved through questioning?",
      },
      {
        id: "completion_criteria",
        name: "completion_criteria",
        type: "textarea",
        placeholder: "When should the questioning stop?",
      },
    ],
    tags: ["pattern", "interactive", "discovery"],
  },
  {
    name: "Cognitive Verifier Pattern",
    template: `When I ask you a question, follow these steps:

1. Generate {num_questions} additional questions that would help answer my original question
2. Combine the answers to these questions to produce the final answer

My question: {question}`,
    variables: [
      {
        id: "num_questions",
        name: "num_questions",
        type: "number",
        min: 2,
        max: 10,
        defaultValue: 3,
      },
      {
        id: "question",
        name: "question",
        type: "textarea",
        placeholder: "Your main question...",
      },
    ],
    tags: ["pattern", "verification", "decomposition"],
  },
  {
    name: "Audience Persona Pattern",
    template: `Explain {topic} for {audience_level}.

Audience characteristics:
- Knowledge level: {knowledge_level}
- Background: {background}
- Goals: {goals}
- Preferred learning style: {learning_style}`,
    variables: [
      {
        id: "topic",
        name: "topic",
        type: "text",
        placeholder: "What topic to explain?",
      },
      {
        id: "audience_level",
        name: "audience_level",
        type: "select",
        options: [
          { value: "complete_beginner", label: "Complete Beginner" },
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
          { value: "expert", label: "Expert" },
        ],
      },
      {
        id: "knowledge_level",
        name: "knowledge_level",
        type: "textarea",
        placeholder: "What does the audience already know?",
      },
      {
        id: "background",
        name: "background",
        type: "textarea",
        placeholder: "Relevant background of the audience...",
      },
      {
        id: "goals",
        name: "goals",
        type: "textarea",
        placeholder: "What does the audience want to achieve?",
      },
      {
        id: "learning_style",
        name: "learning_style",
        type: "select",
        options: [
          { value: "visual", label: "Visual (diagrams, charts)" },
          { value: "textual", label: "Textual (detailed explanations)" },
          { value: "examples", label: "Example-driven" },
          { value: "hands_on", label: "Hands-on (step-by-step)" },
        ],
      },
    ],
    tags: ["pattern", "audience", "education"],
  },
  {
    name: "Fact Check List Pattern",
    template: `{statement_or_content}

Generate a comprehensive fact-check list for the above content. For each claim:
1. Identify the claim
2. Assess verifiability
3. Note what evidence would be needed
4. Flag any potential inaccuracies`,
    variables: [
      {
        id: "statement_or_content",
        name: "statement_or_content",
        type: "textarea",
        placeholder: "Content to fact-check...",
      },
    ],
    tags: ["pattern", "verification", "accuracy"],
  },
  {
    name: "Reflection Pattern",
    template: `{task_description}

After completing the task, reflect on your answer:
1. What assumptions did you make?
2. What could be improved?
3. What alternatives exist?
4. What are the limitations?`,
    variables: [
      {
        id: "task_description",
        name: "task_description",
        type: "textarea",
        placeholder: "Describe the task...",
      },
    ],
    tags: ["pattern", "meta-cognition", "improvement"],
  },
  {
    name: "Semantic Filter Pattern",
    template: `{content_or_task}

Filter/process the above using these semantic criteria:
{filter_criteria}

Do not include:
{exclusion_criteria}`,
    variables: [
      {
        id: "content_or_task",
        name: "content_or_task",
        type: "textarea",
        placeholder: "Content to filter or task to constrain...",
      },
      {
        id: "filter_criteria",
        name: "filter_criteria",
        type: "textarea",
        placeholder: "What should be included or focused on?",
      },
      {
        id: "exclusion_criteria",
        name: "exclusion_criteria",
        type: "textarea",
        placeholder: "What should be excluded or avoided?",
      },
    ],
    tags: ["pattern", "filtering", "constraints"],
  },
  {
    name: "RTF (Role-Task-Format)",
    template: `# Role
{role}

# Task
{task}

# Format
{format}`,
    variables: [
      {
        id: "role",
        name: "role",
        type: "text",
        placeholder: "What role should the AI assume?",
      },
      {
        id: "task",
        name: "task",
        type: "textarea",
        placeholder: "What needs to be done?",
      },
      {
        id: "format",
        name: "format",
        type: "text",
        placeholder: "Desired output format",
      },
    ],
    tags: ["framework", "simple", "structured"],
  },
  {
    name: "Constitutional AI Pattern",
    template: `{task}

Follow these principles:
{principles}

If any response would violate these principles:
1. Acknowledge the conflict
2. Explain why
3. Offer an alternative that aligns with the principles`,
    variables: [
      {
        id: "task",
        name: "task",
        type: "textarea",
        placeholder: "What should be accomplished?",
      },
      {
        id: "principles",
        name: "principles",
        type: "textarea",
        placeholder: "List governing principles and constraints...",
      },
    ],
    tags: ["pattern", "ethics", "safety"],
  },
  {
    name: "Iterative Refinement Pattern",
    template: `{initial_request}

After your first response, I will provide feedback.
Continue refining your response through {num_iterations} iterations, incorporating feedback each time.

Focus improvements on:
{improvement_areas}`,
    variables: [
      {
        id: "initial_request",
        name: "initial_request",
        type: "textarea",
        placeholder: "Initial task or question...",
      },
      {
        id: "num_iterations",
        name: "num_iterations",
        type: "number",
        min: 2,
        max: 10,
        defaultValue: 3,
      },
      {
        id: "improvement_areas",
        name: "improvement_areas",
        type: "textarea",
        placeholder: "What aspects should be refined?",
      },
    ],
    tags: ["pattern", "iterative", "refinement"],
  },
  {
    name: "Socratic Method Pattern",
    template: `Help me understand {topic} through Socratic questioning.

Start with fundamental questions and guide me to discover the answer through:
1. Clarifying questions
2. Probing assumptions
3. Exploring implications
4. Questioning viewpoints

Begin with your first question.`,
    variables: [
      {
        id: "topic",
        name: "topic",
        type: "textarea",
        placeholder: "What topic to explore?",
      },
    ],
    tags: ["pattern", "education", "discovery"],
  },
  // Additional frameworks (37)
  {
    name: "Framework 1",
    template: `# Template
{variable1}
{variable2}`,
    variables: [
      {
        id: "variable1",
        name: "variable1",
        type: "text",
        placeholder: "Enter value for variable1...",
      },
      {
        id: "variable2",
        name: "variable2",
        type: "textarea",
        placeholder: "Enter value for variable2...",
      },
    ],
    tags: ["framework", "example"],
  },
  {
    name: "Framework 2",
    template: `# Template
{variable3}
{variable4}`,
    variables: [
      {
        id: "variable3",
        name: "variable3",
        type: "select",
        options: [
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
        ],
      },
      {
        id: "variable4",
        name: "variable4",
        type: "number",
        min: 1,
        max: 10,
        defaultValue: 5,
      },
    ],
    tags: ["framework", "example"],
  },
  // ... Additional frameworks (35 more)
]
