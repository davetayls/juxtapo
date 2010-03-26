using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using NUnit.Framework;
using Selenium;

namespace juxtapo_testsuite
{
    [TestFixture]
    class testsuite
    {
        private ISelenium selenium;
        private StringBuilder verificationErrors;
		private String browserUrl = "file:///D:/projects/juxtapo/tests/TestSuite.html";

        [SetUp]
        public void SetupTest()
        {
			Console.WriteLine(browserUrl);
            selenium = new DefaultSelenium("localhost", 4444, "*firefox", browserUrl);
            selenium.Start();
            verificationErrors = new StringBuilder();
        }

        [TearDown]
        public void TeardownTest() {
            try
            {
                selenium.Stop();
            }
            catch (Exception)
            {
                // ignore errors
            }
            Assert.AreEqual("", verificationErrors.ToString());
        }

        [Test]
        public void TheNewTest()
        {
            selenium.Open(browserUrl);
            //selenium.Type("q", "selenium rc");
            //selenium.Click("btnG");
            selenium.WaitForPageToLoad("30000");
            Assert.IsTrue(!selenium.IsTextPresent("fail"));
        }
    }
}
