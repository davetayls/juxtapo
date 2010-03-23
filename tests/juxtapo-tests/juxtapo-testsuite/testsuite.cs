using System;
using System.Collections.Generic;
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

        [SetUp]
        public void SetupTest()
        {
            selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://www.google.com/");
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
            selenium.Open("/");
            selenium.Type("q", "selenium rc");
            selenium.Click("btnG");
            selenium.WaitForPageToLoad("30000");
            Assert.IsTrue(selenium.IsTextPresent("Results * for selenium rc"));
        }
    }
}
