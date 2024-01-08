import subprocess
import os

result = subprocess.run(["hostname", "-I"], stdout=subprocess.PIPE)
local_ip = ""

for ip in result.stdout.split():
    if "192.168.18" in ip.decode():
        local_ip = ip.decode()

print("local_ip:", local_ip)
os.environ["RAT_TV_IP"] = local_ip