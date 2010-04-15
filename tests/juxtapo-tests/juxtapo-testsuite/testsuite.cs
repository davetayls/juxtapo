using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using NUnit.Framework;
using Selenium;

namespace juxtapo_testsuite
{
    [TestFixture]
    class testsuite
    {
        //private Process seleniumServerProcess;
        private List<ISelenium> seleniums = new List<ISelenium>();
        private StringBuilder verificationErrors;
        private String projectDir = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\..\\..\\..\\"));
        private String browserUrl = "file:///"+Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\..\\..\\")).Replace("\\","/");
        private String toolsDir = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\..\\..\\..\\")) + "tools\\";

        [SetUp]
        public void SetupTest()
        {
            seleniums.Add(new DefaultSelenium("localhost", 4444, "*firefox", browserUrl));
			//seleniums.Add(new DefaultSelenium("localhost", 4444, "*iexplore", browserUrl));
			foreach (ISelenium sel in seleniums){
            	sel.Start();
			}
            verificationErrors = new StringBuilder();
        }

        [TearDown]
        public void TeardownTest() {
            try
            {
				foreach (ISelenium selenium in seleniums){
                	selenium.Stop();
				}
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
        [Test]
		public void TheControllerTest ()
		{
			foreach (ISelenium selenium in seleniums) {
				selenium.Open ("TestSuite.html?q=testquery");
				Assert.AreEqual ("juxtapo test suite", selenium.GetTitle ());
				selenium.Click ("juxtapo-controller");
				selenium.WaitForPageToLoad ("3000");
				try {
					Assert.IsTrue (Regex.IsMatch (selenium.GetLocation (), "^[\\s\\S]*TestSuite\\.html[\\s\\S]q=testquery[\\s\\S]*$"));
				} catch (AssertionException e) {
					verificationErrors.Append (e.Message);
				}
				try {
					Assert.IsFalse (Regex.IsMatch (selenium.GetLocation (), ".*status=1.*status=1"));
				} catch (AssertionException e) {
					verificationErrors.Append (e.Message);
				}
				Assert.AreEqual ("juxtapo test suite", selenium.GetTitle ());
				selenium.WaitForPageToLoad ("3000");
				Assert.AreEqual ("juxtapo test suite", selenium.GetTitle ());
				try {
					Assert.IsTrue (Regex.IsMatch (selenium.GetLocation (), "^[\\s\\S]*TestSuite\\.html[\\s\\S]q=testquery[\\s\\S]*$"));
				} catch (AssertionException e) {
					verificationErrors.Append (e.Message);
				}
				try {
					Assert.IsTrue (Regex.IsMatch (selenium.GetLocation (), "^[\\s\\S]*status=1[\\s\\S]*$"));
				} catch (AssertionException e) {
					verificationErrors.Append (e.Message);
				}
				selenium.WaitForPageToLoad ("3000");
				try {
					Assert.IsTrue (Regex.IsMatch (selenium.GetLocation (), "^[\\s\\S]*TestSuite\\.html[\\s\\S]q=testquery[\\s\\S]*$"));
				} catch (AssertionException e) {
					verificationErrors.Append (e.Message);
				}
				try {
					Assert.IsFalse (Regex.IsMatch (selenium.GetLocation (), ".*status=1.*status=1"));
				} catch (AssertionException e) {
					verificationErrors.Append (e.Message);
				}
				for (int second = 0;; second++) {
					if (second >= 60)
						Assert.Fail ("timeout");
					try {
						if (selenium.IsElementPresent ("juxtapo-controller"))
							break;
					} catch (Exception) {
					}
					Thread.Sleep (1000);
				}
				selenium.Click ("juxtapo-controller");
				try {
					Assert.IsFalse (Regex.IsMatch (selenium.GetLocation (), ".*status=1.*status=1"));
				} catch (AssertionException e) {
					verificationErrors.Append (e.Message);
				}
				selenium.CaptureEntirePageScreenshot (Path.GetFullPath (Path.Combine (Directory.GetCurrentDirectory (), "..\\..\\..\\..\\"))+"juxtapotestsuite-screenshot.png", "");
			}
		}
		
	}
}
