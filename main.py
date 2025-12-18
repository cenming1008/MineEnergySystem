import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from app.core.database import init_db

# 👇 1. 导入新模块 (reports, fdd)
from app.api.endpoints import devices, telemetry, analysis, alarms, reports, fdd
from app.models import tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    print("🚀 数据库连接成功，全功能系统启动！")
    yield
    print("🛑 系统已关闭")

app = FastAPI(title="煤矿综合能源管理系统后端 (完整版)", lifespan=lifespan)

app.mount("/view", StaticFiles(directory="static", html=True), name="static")

# 👇 2. 注册新路由
app.include_router(devices.router, prefix="/devices", tags=["设备管理"])
app.include_router(telemetry.router, prefix="/telemetry", tags=["遥测数据"])
app.include_router(analysis.router, prefix="/analysis", tags=["数据分析"])
app.include_router(alarms.router, prefix="/alarms", tags=["报警中心"])

# 新增的两个：
app.include_router(reports.router, prefix="/reports", tags=["报表中心"])
app.include_router(fdd.router, prefix="/fdd", tags=["故障诊断"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8088, reload=True)