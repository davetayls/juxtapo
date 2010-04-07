using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using NUnit.Framework;
using Selenium;

namespace SeleniumTests
{
	[TestFixture]
	public class controller
	{
		private ISelenium selenium;
		private StringBuilder verificationErrors;
		
		[SetUp]
		public void SetupTest()
		{
			selenium = new DefaultSelenium("localhost", 4444, "*chrome", "file:///D:/projects/juxtapo/tests/TestSuite.html");
			selenium.Start();
			verificationErrors = new StringBuilder();
		}
		
		[TearDown]
		public void TeardownTest()
		{
			try
			{
				selenium.Stop();
			}
			catch (Exception)
			{
				// Ignore errors if unable to close the browser
			}
			Assert.AreEqual("", verificationErrors.ToString());
		}
		
		[Test]
		public void TheControllerTest()
		{
			selenium.Open("file:///D:/projects/juxtapo/tests/TestSuite.html");
			Assert.AreEqual("juxtapo test suite", selenium.GetTitle());
			selenium.Click("juxtapo-controller");
			selenium.WaitForPageToLoad("3000");
			Assert.AreEqual("juxtapo test suite", selenium.GetTitle());
		}
	}
}
