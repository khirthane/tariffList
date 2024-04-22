import { SpeedPipe } from './speed.pipe';

describe('SpeedPipe', () => {
  let pipe: SpeedPipe;

  beforeEach(() => {
    pipe = new SpeedPipe();
  });

  it('create an internet speed instance', () => {
    const pipe = new SpeedPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "N/A" for undefined or zero speed', () => {
    expect(pipe.transform(undefined)).toBe('N/A');
    expect(pipe.transform(0)).toBe('N/A');
  });

  it('should correctly convert speed to Mbps', () => {
    expect(pipe.transform(1000000)).toBe('1.00 Mbps');
    expect(pipe.transform(2000000)).toBe('2.00 Mbps');
    expect(pipe.transform(2500000)).toBe('2.50 Mbps');
  });
});
