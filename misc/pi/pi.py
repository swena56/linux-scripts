#!/usr/bin/env python
# https://helloacm.com

import sys

def compute(len):
    x = [0] * len
    z = [0] * len
    x[1] = z[1] = 2
    a = 1; b = 3
    while True:
        # z *= a
        d = 0
        j = len - 1
        while j > 0:
            c = z[j] * a + d
            z[j] = c % 10
            d = c / 10
            j -= 1
        # z /= b
        d = 0
        for j in xrange(len):
            c = z[j] + d * 10
            z[j] = c / b
            d = c % b
        # x += z
        run = 0
        j = len - 1
        while j > 0:
            c = x[j] + z[j]
            x[j] = c % 10
            x[j - 1] += c / 10
            run |= z[j]
            j -= 1
        if not run:
            break
        a += 1
        b += 2
    return "".join(map(str, x))

print sys.argv[1]
print compute(int(sys.argv[1]))
