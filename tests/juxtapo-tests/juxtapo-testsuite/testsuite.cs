using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using NUnit.Framework;
using Selenium;

namespace juxtapo_testsuite
{
    [TestFixture]
    class testsuite
    {
        private Process seleniumServerProcess;
        private List<ISelenium> seleniums = new List<ISelenium>();
        private StringBuilder verificationErrors;
        private String projectDir = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\..\\..\\..\\"));
        private String browserUrl = "file:///"+Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\..\\..\\")).Replace("\\","/");
        private String toolsDir = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\..\\..\\..\\")) + "tools\\";

        [SetUp]
        public void SetupTest()
        {
            seleniums.Add(new DefaultSelenium("localhost", 4444, "*firefox", browserUrl));
			//seleniums.Add(new DefaultSelenium("localhost", 4444, "*googlechrome", browserUrl));
			foreach (ISelenium sel in seleniums){
            	sel.Start();
			}
            verificationErrors = new StringBuilder();
        }

        //public void StartSeleniumServer()
        //{
        //    seleniumServerProcess = new Process();
        //    seleniumServerProcess.StartInfo.FileName = "java";
        //    String args = "-jar " + toolsDir + "selenium\\selenium-server\\selenium-server.jar";
        //    Console.WriteLine(args);
        //    seleniumServerProcess.StartInfo.Arguments = args;
        //    seleniumServerProcess.Start();
        //    Console.WriteLine("Starting Selenium Server");
        //}
        //private void DisposeOfSeleniumServer()
        //{
        //    if (seleniumServerProcess != null)
        //    {
        //        try
        //        {
        //            seleniumServerProcess.Kill();
        //            bool result = seleniumServerProcess.WaitForExit(10000);
        //        }
        //        finally
        //        {
        //            seleniumServerProcess.Dispose();
        //            seleniumServerProcess = null;
        //        }
        //    }
        //}
        [TearDown]
        public void TeardownTest() {
            try
            {
				foreach (ISelenium selenium in seleniums){
                	selenium.Stop();
				}
                //DisposeOfSeleniumServer();
            }
            catch (Exception)
            {
                // ignore errors
            }
            Assert.AreEqual("", verificationErrors.ToString());
        }

        [Test]
        public void VerifyQunitTests()
        {
			foreach (ISelenium selenium in seleniums){
	            selenium.Open("TestSuite.html");
	            selenium.WaitForPageToLoad("30000");
	            selenium.WaitForCondition("typeof(window.QUnitDone) != 'undefined' && window.QUnitDone", "30000");
	            Boolean IsPass = selenium.IsElementPresent("//h2[@class='qunit-pass']");
	            Assert.IsTrue(IsPass);
			}
        }
    }
}
