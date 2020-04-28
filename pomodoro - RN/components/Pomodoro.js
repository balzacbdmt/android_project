import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class Pomodoro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            started: false,
            pause: false,
            timer: 0,
            pauseTime: 300000,
            workTime: 1500000
        }
    }

    startTimer = () => {
        if (this.state.started) {
            return;
        }
        if (this.state.timer === 0) {
          this.setState({
            started: true,
            timer: this.state.pauseTime + this.state.workTime,
          });
        } else {
          this.setState({
            started: true,
          });
        }    
        this.timer = setInterval(() => {
          this.setState({ timer: this.state.timer - 10 });
          if (this.state.timer < this.state.pauseTime) {
            this.setState({ pause: true })
          } else {
            this.setState({ pause: false })
          }
          if (this.state.timer === 0 && this.state.started) {
            this.resetTimer();
            alert("Work done !")
          }
        }, 10);
    };
    
    stopTimer = () => {
        this.setState({ started: false })
        clearInterval(this.timer);
    };
    
    resetTimer = () => {
        this.stopTimer()
        this.setState({ 
          timer: this.state.pauseTime + this.state.workTime,
          pause: false,
          started: false
        })
    };
    
    changeWorkTime = (text) => {
        let val = 0
        if (text) {
          val = 0 + parseInt(text)*60000
        } 
        this.stopTimer()
        this.setState({ 
          workTime: val,
          timer: this.state.pauseTime + val,
          pause: false,
          started: false
        })
    }
    
    changePauseTime = (text) =>  {
        let val = 0
        if (text) {
          val = 0 + parseInt(text)*60000
        } 
        this.stopTimer()
        this.setState({ 
          pauseTime: val,
          timer: this.state.workTime + val,
          pause: false,
          started: false
        })
    }

    render() {
        const pause = this.state.pause
        const pauseTime = this.state.pauseTime
        const started = this.state.started
        const { timer } = this.state
        let seconds = ("0" + (Math.floor(timer / 1000) % 60)).slice(-2)
        let minutes = Math.floor(timer / 60000)
        let status
        if (pause) {
            status = <Text style={{color: 'green'}}>Pause time :D</Text>
        } else if (!pause && started) {
            status = <Text style={{color: 'yellow'}}>Work time :D</Text>
        } else {
            status = <Text style={{color: 'red'}}>Stopped</Text>
        }

        let compteur;
        if (timer <= (pauseTime+20000) && !pause || timer <= 20000 && pause) {
            compteur = <Text style={{color: 'red'}}>{minutes}m {seconds}s</Text>
        } else {
            compteur = <Text style={{color: '#61dafa'}}>{minutes}m {seconds}s</Text>
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pomodoro</Text>
                <Text style={styles.subTitle}>{compteur}</Text>
                <Text style={styles.subTitle}>{status}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{margin: 10, alignItems: 'center'}}>
                        <Text style={styles.text}>Working time</Text>
                        <Text style={styles.text}>(minutes)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={text => this.changeWorkTime(text)}
                            value={this.state.workTime/60000+""}
                        />
                    </View>
                    <View style={{margin: 10, alignItems: 'center'}}>
                        <Text style={styles.text}>Pause time</Text>
                        <Text style={styles.text}>(minutes)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={text => this.changePauseTime(text)}
                            value={this.state.pauseTime/60000+""}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.button}>
                        <Button
                            onPress={this.startTimer}
                            title="Start"
                            color="#61dafa"
                            accessibilityLabel="start the timer button"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={this.stopTimer}
                            title="Stop"
                            color="#61dafa"
                            accessibilityLabel="Stop the timer button"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={this.resetTimer}
                            title="Reset"
                            color="#61dafa"
                            accessibilityLabel="Reset the timer button"
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontSize: 54,
        color: '#fff'
    },
    subTitle: {
        fontSize: 48
    },
    text: {
        textAlign: 'center',
        color: '#fff'
    },
    input: {
        textAlign: 'center',
        color: '#fff',
        borderColor: '#61dafa',
        borderWidth: 2,
        borderRadius: 5,
        padding: 8,
        margin: 5,
        width: 50
    },
    button: {
        textAlign: 'center',
        color: '#fff',
        borderColor: '#61dafa',
        borderWidth: 2,
        borderRadius: 5,
        padding: 8,
        margin: 10,
    }
});

export default Pomodoro;