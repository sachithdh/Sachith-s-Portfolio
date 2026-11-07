---
title: "Adding Your Own System Call to xv6"
date: "2026-11-07"
description: "A hands on walkthrough of adding a new system call to xv6."
tags: ["OS","xv6", "Kernel"]
---

## A little background.

### What's a system call?

It's the doorway between an ordinary program and the kernel. Your program isn't allowed to touch hardware directly, so whenever it needs something it doesn't have permission to do (write to the screen, read a file, create a process), it  asks the kernel through a system call.

### User mode vs kernel mode

The CPU runs in different privilege levels, and the kernel keeps the most powerful one for itself.

- **User mode** is the least trusted. Privileged instructions are simply blocked here. Your programs live in this mode.
- **Kernel (supervisor) mode** can do everything: change page tables, disable interrupts, talk to devices.
- **Machine mode** sits even lower and is used to configure the hardware itself. That's a RISC-V idea (xv6 has a RISC-V version too); the x86 version we're using doesn't have it.

A system call is a round trip between the first two:

1. Your process runs in **user mode** (mode bit = 1).
2. It makes a system call, which causes a **trap**. The CPU flips into **kernel mode** (mode bit = 0).
3. The kernel does the requested work.
4. The kernel returns, sets the mode bit back to 1, and your program carries on right after the call.

### What's a trap?

A trap is any event that forces the CPU to jump into the kernel's trap-handling code. There are three ways it happens:

1. **System call**: the program asks for a service on purpose, like `write()` or `fork()`.
2. **Exception**: an instruction does something illegal, like dividing by zero or touching memory it shouldn't.
3. **Interrupt**: a hardware device wants attention, like a timer tick, a key press, or a disk finishing its work.

All three enter the kernel the same way. We'll see later exactly where they split apart.

Every system call you can use is declared in `user.h`. They look like normal C functions, but none of them has a C body in user space. Each one is a tiny assembly stub that traps into the kernel. That's exactly what we're about to build.

## Adding the system call.

Adding a syscall means touching five files. It helps to think of them in two groups:

| Side | File | What it does |
| --- | --- | --- |
| User | `user.h` | Declares the prototype so the compiler accepts calls to it |
| User | `usys.S` | Generates the assembly stub that traps into the kernel |
| Kernel | `syscall.h` | Gives the call a number |
| Kernel | `syscall.c` | Declares the handler and adds it to the dispatch table |
| Kernel | `sysproc.c` | Holds the actual logic |

Let's go through them one by one.

### Step 1: Give it a number (`syscall.h`)

Every syscall is identified by a number. Open `syscall.h`, look at the last entry (in stock xv6 it's `SYS_close` at 21), and add yours right after it:

```c
#define SYS_mysyscall 22
```

This number is how the kernel will know which service you're asking for. Remember 22, we'll see it again.

### Step 2: Write the actual logic (`sysproc.c`)

This is the part that runs inside the kernel. Add this function at the bottom of `sysproc.c`:

```c
int
sys_mysyscall(void)
{
  return 1000;
}
```

In a real syscall this is where the interesting work would happen. For us, returning 1000 is enough to prove the whole path works.

### Step 3: Register it (`syscall.c`)

`syscall.c` needs two small changes. First, tell it the handler exists (it lives in another file), next to the other `extern` lines:

```c
extern int sys_mysyscall(void);
```

Second, add it to the `syscalls[]` table. This is an array of function pointers that maps each number to its handler:

```c
static int (*syscalls[])(void) = {
  // ... existing entries ...
  [SYS_close]     sys_close,
  [SYS_mysyscall] sys_mysyscall,
};
```

That `[SYS_mysyscall]` syntax means "put this at index 22". Forget this line and the kernel will complain with `unknown sys call 22`.

### Step 4: Generate the user stub (`usys.S`)

Now the user side. Add one line at the end of `usys.S`:

```asm
SYSCALL(mysyscall)
```

That's a macro. It expands into a tiny assembly function that looks like this:

```asm
mysyscall:
    movl $SYS_mysyscall, %eax   # eax = 22
    int  $T_SYSCALL             # int 64
    ret
```

It puts the syscall number into the `eax` register and then fires `int 64`, which is the trap into the kernel. Simple as that.

### Step 5: Declare it for user programs (`user.h`)

Finally, add the prototype to `user.h` with the other system calls:

```c
int mysyscall(void);
```

Without this, the C compiler wouldn't know `mysyscall()` exists and would refuse to compile your program.

## Testing it

Time to see if it works. Create a file called `myprog.c` in the xv6 folder:

```c
#include "types.h"
#include "user.h"

int main(void) {
  printf(1, "%d\n", mysyscall());
  exit();
}
```

Then add `_myprog\` to the `UPROGS` list in the `Makefile` so it gets built into the file system. Build and boot:

```bash
make qemu
```

At the xv6 shell, run it:

```bash
$ myprog
1000
```

If you see `1000`, congratulations, you just added a system call!&#32;
