Differences between LangChain, LangGraph, and LangSmith.

**LangChain** 
is a framework for building applications powered by large language models (LLMs). 
It is best suited for **creating "workflows" or "chains"** where the LLM performs a specific, pre-defined task. 
This is ideal for simple, linear processes like summarizing text or extracting information. LangChain is partially stateful and is a good choice for building simple chatbots and Retrieval Augmented Generation (RAG) systems.

**LangGraph**
is a framework for more complex, **"agentic" applications.** It uses a graph-based structure to orchestrate **multi-step, stateful workflows**. This allows an LLM to perform goal-oriented planning, reason through multiple steps, and handle failures by retrying. LangGraph is well-suited for building complex agents that can break down large tasks into smaller subtasks and have a degree of autonomy. It supports loops, retries, and has a memory base, making it ideal for complex agents and multi-step workflows.

**States** 

**Stateful Architecture**:
In a stateful system, each server remembers a user's session information, much like a waiter remembering your order . The problem with this is that if the server handling your session goes down, or you are redirected to another server, the new server will have no information about your previous interactions, and you will have to start over. This also makes it difficult to scale stateful systems, as each user's session is tied to a specific server.

**Stateless Architecture**:
A stateless system, on the other hand, is like waiters writing down orders on paper; no server remembers who you are . All user data is stored in a shared, external database . This allows any server to handle a user's request by fetching their information from the shared database, making it much easier to handle traffic and server issues. Stateless systems are highly scalable because adding or removing servers is simple, as all data is centralized. This is why large platforms like Facebook and Instagram use stateless architectures.

In summary, **stateful systems remember user sessions but are harder to scale**, while **stateless systems don't remember individual sessions but are highly scalable** due to the use of a shared database. For applications that need to grow quickly and handle many users, a stateless architecture is generally preferred.
![[Pasted image 20250728191226.png]]


**LangSmith** 
is a debugging and observability platform for LLM applications. It is part of the same ecosystem as LangChain and LangGraph, both of which are open-source. LangSmith provides tools for **debugging**, **managing prompts**, **monitoring performance**, and **evaluating** the cost of deployed agentic systems. It allows you to trace individual calls within an application, showing inputs, outputs, token usage, and latency.

In short, LangChain is for simpler, linear applications, LangGraph is for complex, multi-step systems, and LangSmith is for debugging and monitoring both.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdY2m29ujmZlshsN_PEY16ksAWagDXNPwkitBk3S2T3KHLgjVtAiMGUCDhGD3QcxpEr-hS1KuGi9CCQNVkJvstBrMQMAZpLMihPNL9XdIFcZwSBww5yBzrnaPPJr4G-n3YwwPTN?key=4gIplioypPBNz93sXmV-KQ)


## Something

Normal LLM -> does not have access to company information
Concept RAGs helps in this

Documents Retrieval, Split Docs Into Chunks (context window), Vector DB (semantic search), Retrieval, LLM

Documents Retrieval -> TextLoader
Split Docs Into Chunks (context window) -> CharacterTextSplitter
Vector DB (semantic search) -> FAISS
Retrieval -> RetrievalQAWithSourcesChain
LLM

![[Pasted image 20250728180613.png]]

![[Pasted image 20250728185537.png]]

Based on the image of the whiteboard, here is a summary of the concepts discussed:

The central topic is **LangChain**, which is described as a **language model chaining framework**. It is designed to build applications by creating multi-step logic around Large Language Models (LLMs).

### Problem Solved by LangChain
LangChain addresses the limitations of using a base LLM (like GPT) on its own, which include:
* No memory of past interactions
* Use of generic, non-dynamic prompts
* Limited context window
* Inability to use external tools or be orchestrated

### Core Concepts of LangChain
The framework is built on several key components:
* **LLM:** The "brain" of the operation.
* **Prompt Template:** Provides a structured way to create prompts.
* **Chains:** A sequence of steps or calls, forming the core logic.
* **Memory:** Allows the system to remember the entire history of a chain or conversation.
* **Agents & Tools:** An **Agent** is an LLM that decides what actions to take, using **Tools** to perform specific tasks (e.g., search, database lookups).
* **Data Connection:**
    * **Embedding:** A process to turn text into numerical representations.
    * **Vector Store:** A database to store these embeddings for efficient searching.
    * **Retriever:** A mechanism to find and retrieve relevant documents from the vector store.

### Evolution and Architecture
The framework evolved from initial concepts like prompt templating and simple chains to a more complex system incorporating:
* **Memory**
* **Tool Integration** (Search, SQL, Pandas, etc.)
* **Agents** (LLMs that use tools)
* A **Unified API** with modular building blocks.

### Key Characteristics
Applications built with LangChain are:
* Context-aware
* Data-connected
* Stateful
* Scalable

### Use Cases
Common applications for LangChain include:
* Chatting with your own files (PDFs, documents).
* Building LLM-powered agents and assistants.
* Tasks like summarization, translation, or code reuse.
* Providing a modular framework for building complex AI applications.

The notes also mention **Harrison Chase** as a key figure associated with LangChain.

Of course, here is an explanation of **LangGraph** using the same template from the whiteboard.

### LangGraph: The Framework for Agentic AI

---
### Core Concept 🧠

**LangGraph** is an extension of LangChain designed specifically for building **stateful, multi-actor applications** like AI agents. While LangChain focuses on creating chains (sequences of calls), LangGraph allows you to define workflows as a **graph**. This structure is essential for creating applications where multiple "actors" (like an LLM, tools, or human input) can interact in a cyclical and controlled manner.

---
### Problem It Solves 🤔

Standard LangChain chains are often linear (a -> b -> c), which works well for many tasks. However, when you need to build more complex "agentic" systems that can:
* **Loop and retry** steps.
* **Make decisions** and follow different paths based on input.
* Involve **human-in-the-loop** for approval or feedback.
* Coordinate **multiple, independent agents**.

... a simple chain isn't enough. LangGraph provides the cyclical and stateful structure needed for these advanced, dynamic applications where the exact path isn't known beforehand.

---

### How It Works ⚙️

LangGraph introduces a few key ideas to the LangChain ecosystem:
* **Nodes:** These are the fundamental units of work in the graph. A node can be a function, a LangChain component, or any callable piece of logic.
* **Edges:** These are the connections between nodes that determine the direction of the workflow.
* **State:** The entire graph shares a central **state object**. Each node can update this state, and the state is passed between nodes. This is how LangGraph achieves memory and statefulness.
* **Conditional Edges:** This is the "magic" of LangGraph. You can create edges that direct the flow to different nodes based on the current state, allowing for complex, branching logic.

---

### Use Cases 🛠️

LangGraph is ideal for building:
* **Reliable AI Agents:** Create agents that can attempt a task, check the result, and decide whether to retry, use a different tool, or ask for help.
* **Human-in-the-loop Systems:** Build workflows where an AI agent can perform a series of steps and then pause for human approval before continuing.
* **Multi-Agent Systems:** Design complex systems where different agents can collaborate, passing information back and forth to solve a problem.
* **Advanced Chatbots:** Create more sophisticated chatbots that can manage complex tasks and conversations over multiple turns.

---

### Key Characteristics ✨

* **Cyclical:** Unlike chains, graphs can have loops, allowing for iterative processing.
* **Stateful:** The shared state object provides robust memory across the entire application.
* **Controllable & Reliable:** You can define exactly how the agent should behave, add checks, and manage its actions.
* **Extensible:** It's a low-level tool that gives you the primitives to build highly custom agent architectures.


```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# 1. Define the state for the graph
class AgentState(TypedDict):
    input: str
    output: Annotated[list[str], operator.add]

# 2. Define the nodes (functions)
def node_one(state):
    print("---Executing Node One---")
    # Update the state
    return {"output": ["Output from Node One"]}

def node_two(state):
    print("---Executing Node Two---")
    return {"output": ["Output from Node Two"]}

# 3. Build the graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("node_one", node_one)
workflow.add_node("node_two", node_two)

# Set the entry point and edges
workflow.set_entry_point("node_one")
workflow.add_edge("node_one", "node_two")
workflow.add_edge("node_two", END)

# Compile the graph into a runnable app
app = workflow.compile()

# Run the graph
initial_state = {"input": "Hello, LangGraph!"}
final_state = app.invoke(initial_state)

print(final_state)
# Expected Output: {'input': 'Hello, LangGraph!', 'output': ['Output from Node One', 'Output from Node Two']}
```

