# electron
## 개발 환경
- version
    - node : 14.17.3
    - npm : 6.14.13
    - craco : 5.8 (리액트 버전에 따라 다름)

## 실행
- npx create-react-app app --typescript or npx create-react-app app --template typescript
	- 리액트 타입스크립트 
- npm i electron-is-dev
- npm i electron electron-builder concurrently cross-env wait-on typescript --save-dev


		Electron-is-dev: 개발환경인지 빌드한 프로덕션환경인지 확인을 위하여 사용됨.
		Electron : 일렉트론을 실행하기 위해서 사용됨.
		Electron-builder : 일렉트론을 실제 프로덕션 버전으로 빌드하기 위해 사용됨.
		concurrently : 동시에 여러 명령어를 사용(병렬적으로)하기 위해 사용됨.
		cross-env : 프로그램을 CLI환경에서 실행 시킬 때에, OS에 관계 없이 환경변수를 설정할 수 있도록 하기 위해 사용됨.
		wait-on : HTTP 자원, port, file등이 활성화 될 때 까지 기다려주는 cross platform
		typescript : typescript






## 스크립트
- [start] 
	- electron.ts를 js파일로 변환해 준 후, co0ncurrently를 통해 browser로 띄우지 않고 리액트를 실행시킨 후 http://localhost:3000이 로드가 완료되면 electron을 실행시킨다.
- [build] 
	- dist폴더에 production 실행파일을 생성해준다.
- [release]
	- build명령어와 같지만 그 후 배포를 해준다. (추가설정 필요)
	

## npm install
- npm install ffmpeg-static-electron
- npm install fluent-ffmpeg
- npm install ffprobe-static-electron
- npm install electron-log
- npm install react-player

## 참고문서
- electorn ffmpeg build pakage.json
	- https://github.com/OpenNewsLabs/autoEdit_2/blob/master/package.json
- video-player example)
	- https://codesandbox.io/s/f2uzv?file=/src/Player.js


#필수코드 
--TASK_MODULE_TYPE
---fs_copy

--MEDIA_TYPE
---out
---original

- tsconfig.path.json
      "@route/*" : [
        "./public/lib/route/*"
      ],
      "@service/*" :[
        "./public/service/*"
      ]


-pakage.json
  "@route" : "./public/lib/route",
    "@service" : "./public/service"