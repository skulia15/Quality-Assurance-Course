module.exports = (context) => {
  const HotShots = context('hotshots');
  return new HotShots({
    host: 'my_datadog_container',
    globalTags: {env: process.env.ENVIRONMENT}
  });
};
