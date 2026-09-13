import os
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import psutil
import pyautogui
from llama_cpp import Llama # <-- LLM Brain imported!

app = FastAPI(title="JARVIS Core System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

class UserCommand(BaseModel):
    prompt: str
    language: str = "te-IN"

class CallSimulate(BaseModel):
    caller_name: str
    caller_number: str

WHITELIST_NUMBERS = ["7658939465", "9346002512"]

# ==========================================
# JARVIS OFFLINE LLM INITIALIZATION
# ==========================================
print("Loading JARVIS LLM Brain... (Idhi koncham time theesukuntundi)")
try:
    llm = Llama(
        model_path="tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf", # Exact file name
        n_ctx=512,        # Context window size
        n_threads=2,      # 4GB RAM CPU kosam optimized
        verbose=False
    )
    print("Brain Activation: SUCCESS! I am ready, Sankar.")
except Exception as e:
    print(f"Error loading AI brain: {e}. File name correct ga undo ledo check cheyi.")
    llm = None
# ==========================================

@app.get("/")
async def serve_dashboard():
    return FileResponse("static/index.html")

@app.get("/api/telemetry")
async def get_system_telemetry():
    ram = psutil.virtual_memory()
    battery = psutil.sensors_battery()
    
    disk_e_free = "N/A"
    if os.path.exists("E:\\"):
        disk_e = psutil.disk_usage("E:\\")
        disk_e_free = f"{disk_e.free // (1024**3)} GB Free"

    now = datetime.now()
    return {
        "status": "ONLINE",
        "time": now.strftime("%I:%M:%S %p"),
        "date": now.strftime("%a, %d %b %Y"),
        "ram_usage": f"{ram.percent}%",
        "ram_free": f"{ram.available // (1024*1024)} MB",
        "battery": f"{battery.percent}%" if battery else "Plugged in",
        "brain_storage": disk_e_free,
        "active_devices": ["Win 10 Laptop (Core)", "POCO M6 5G (Remote)"]
    }

@app.post("/api/read-screen")
async def read_laptop_screen():
    try:
        screenshot = pyautogui.screenshot()
        width, height = screenshot.size
        return {"status": "success", "reply": f"Screen perfectly captured. Resolution: {width}x{height}."}
    except Exception as e:
        return {"status": "error", "reply": f"Error: {str(e)}"}

@app.post("/api/command")
async def handle_command(cmd: UserCommand):
    user_text = cmd.prompt.lower().strip()
    
    # 1. Hardware Commands (Instant execution)
    if "battery" in user_text:
        battery = psutil.sensors_battery()
        return {"reply": f"Boss, laptop battery {battery.percentage}% undi."}
        
    elif "read screen" in user_text or "screen" in user_text:
        return await read_laptop_screen()
        
    # 2. Dynamic LLM Brain Generation (AI thinking)
    else:
        if llm:
            # JARVIS ki manam iche "Personality" prompt idhi
            formatted_prompt = f"<|system|>\nYou are JARVIS, an advanced AI assistant created by Sankar. You are currently running offline on his laptop. Answer questions briefly and smartly.</s>\n<|user|>\n{cmd.prompt}</s>\n<|assistant|>\n"
            
            try:
                # LLM answer generate chesthundi
                response = llm(
                    formatted_prompt,
                    max_tokens=1000, # Chala fast ga answer ivvadaniki
                    stop=["</s>"],
                    echo=False
                )
                ai_reply = response["choices"][0]["text"].strip()
                return {"reply": ai_reply}
            except Exception as e:
                return {"reply": "Nenu aalochinchadam lo problem vachindi Boss."}
        else:
            return {"reply": "AI Brain file dorakaledu. System offline ga matrame pani chesthundi."}

@app.post("/api/call-filter")
async def handle_call(call: CallSimulate):
    if call.caller_number in WHITELIST_NUMBERS:
        return {"action": "CONNECT_USER", "message": f"{call.caller_name} call chesthunnaru. Connecting!"}
    else:
        return {"action": "JARVIS_ANSWER", "message": f"Unknown call from {call.caller_number}. JARVIS lift chesi matladuthundi."}
    class CodeRequest(BaseModel):
    prompt: str

@app.post("/api/generate-code")
async def generate_code(req: CodeRequest):
    if llm:
        try:
            # AI Brain unte idhi run avthundi
            system_prompt = f"<|system|>\nYou are an expert Python developer. Write the code for the user's request.\n<|user|>\n{req.prompt}\n<|assistant|>\n"
            response = llm(system_prompt, max_tokens=300, stop=["<|user|>"])
            generated_code = response["choices"][0]["text"].strip()
            return {"code": generated_code}
        except Exception as e:
            return {"code": f"# System Error: {str(e)}"}
    else:
        # AI Brain offline unte (Fallback Mode)
        fallback_code = f"""# [JARVIS CODE FORGE - FALLBACK MODE]
# AI Brain is currently offline due to hardware limits.
# Here is a basic structural template for: {req.prompt}

def auto_generated_feature():
    print("Initiating new protocol...")
    # TODO: Add specific logic here
    pass

if __name__ == "__main__":
    auto_generated_feature()
"""
        return {"code": fallback_code}