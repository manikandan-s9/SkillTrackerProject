set Path=%Path%;..\packages\OpenCover.4.6.519\tools;..\packages\ReportGenerator.3.1.2\tools;
set msTestPath=C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\mstest.exe
set unitTestPath=..\SkillsTrackerAPI.Tests\bin\Debug\SkillsTrackerAPI.Tests.dll
set unitTestResultsFolder=UnitTestResults
set unitTestResults=%unitTestResultsFolder%\.trx
set codeCoverageReportFolder=CodeCoverageReport

rd /s /q %unitTestResultsFolder%
rd /s /q %codeCoverageReportFolder%

mkdir %unitTestResultsFolder%

OpenCover.Console.exe -register:user -target:"%msTestPath%" -targetargs:" /testcontainer:\"..\SkillsTrackerAPI.Tests\bin\Debug\SkillsTrackerAPI.Tests.dll\" /resultsfile:%unitTestResults%" -mergebyhash -output:%unitTestResultsFolder%\SkillsTrackerAPICoverageReport.xml

ReportGenerator.exe -reports:"%unitTestResultsFolder%\SkillsTrackerAPICoverageReport.xml" -targetdir:"%codeCoverageReportFolder%" 