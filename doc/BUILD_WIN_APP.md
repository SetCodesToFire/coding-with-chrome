Build Coding with Chrome - Binary Windows Application
==============================================
<p align="center"><img src="../static_files/images/cwc_logo.png"></p>

## Prerequisites
Please make sure you followed the [Build pre-requisites](../BUILD.md) before using this document.

## Build the core files
In order to build the actual app you need first to build all core files.
This step is normally needed only once and after an update of the core files.
This could be done with the following command:
```bash
npm run build-core
```

## Build the launcher
To compile the binary launcher run the build script with the following command:
```bash
npm run build-nw_app
```

## Build the actual app
To compile the packed binary version run the build script with the following command:
```bash
npm run publish-nw_app-win
```
The build version will be compiled in the `/dist/binary/win64` and `/dist/binary/win32` directory, together with all required packages and files.

### Launch the app
Go into the `/dist/binary/win64` (64bit) or `/dist/binary/win32` (32bit) directory and double click on the `binary.exe` file.

## Troubleshooting
