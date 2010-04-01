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
        private String browserUrl = "file:///"+Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\..\\..\\")).Replace("\\","/");

        [SetUp]
        public void SetupTest()
        {
			Console.WriteLine(browserUrl);
            Console.WriteLine(Directory.GetCurrentDirectory());
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
        public void VerifyQunitTests()
        {
            selenium.Open("TestSuite.html");
            selenium.WaitForPageToLoad("30000");
            selenium.WaitForCondition("typeof(window.QUnitDone) != 'undefined' && window.QUnitDone", "30000");
            Boolean IsPass = selenium.IsElementPresent("//h2[@class='qunit-pass']");
            Assert.IsTrue(IsPass);
        }
    }
}
