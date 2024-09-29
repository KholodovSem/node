## Byte order

#### How to store 32 bit (4 byte) number?

```
0x00c0ffee
```

Big Endian: starts from MSB (Most Significant Bite)
```
00 | c0 | ff | ee
```

Little Endian: starts from LSB (Least Significant Bite)
```
ee | ff | c0 | 00
```

### Summary:
- **Big Endian** stores the bytes in order as they appear, starting from the MSB.
- **Little Endian** reverses the byte order, starting from the LSB.